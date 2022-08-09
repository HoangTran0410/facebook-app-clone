import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CircleIconButton, HomeTabButton} from '../components';
import {Colors, FontWeights, Radius, Sizes, Spacing} from '../constants/theme';
import {useHomeScrollEffect} from '../hooks/useHomeScrollEffect';
import {HomeScreen} from './HomeScreen';
import {BlankScreen} from './BlankScreen';
import * as icons from '../constants/icons';
import {openApp} from '../helpers/utils';

export const MainScreen = ({}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  // #region useRef
  const tabScreenFlatListRef = useRef(null);
  const tabScreenScrollX = useRef(new Animated.Value(0)).current;

  const {
    setOpenTopbar,
    onScrollHome,
    handleSnap,
    homeFlatlistRef,
    headerHeightRef,
    homeScrollTranslateY,
  } = useHomeScrollEffect();

  // #endregion

  // #region useEffect
  // auto scroll screen to active tab
  useEffect(() => {
    tabScreenFlatListRef.current?.scrollToIndex({
      index: activeTabIndex,
      animated: true,
    });
    setOpenTopbar(activeTabIndex === 0);
  }, [activeTabIndex]);
  // #endregion

  // #region handlers
  const updateSelectedPage = nextPage => {
    // TODO: add logic here
  };

  const handleTabScreenScrollEnd = event => {
    const x = event.nativeEvent.contentOffset.x;
    const tabIndex = Math.round(x / Sizes.width);

    if (tabIndex !== activeTabIndex) {
      setActiveTabIndex(tabIndex);
    }
  };

  const getTabScreenItemLayout = (data, index) => ({
    length: Sizes.width,
    offset: Sizes.width * index,
    index,
  });
  // #endregion

  const tabs = [
    {
      icon: icons.home,
      activeIcon: icons.home_filled,
      title: 'Home',
      component: (
        <HomeScreen
          ref={homeFlatlistRef}
          onScroll={onScrollHome}
          onMomentumScrollEnd={handleSnap}
          headerHeight={headerHeightRef.current}
        />
      ),
    },
    {
      icon: icons.user,
      activeIcon: icons.user_filled,
      title: 'Profile',
      component: <BlankScreen name="Profile" />,
    },
    {
      icon: icons.feed,
      activeIcon: icons.feed_filled,
      title: 'Feed',
      component: <BlankScreen name="Feed" />,
    },
    {
      icon: icons.bell,
      activeIcon: icons.bell_filled,
      title: 'Notifications',
      component: <BlankScreen name="Notification" />,
    },
    {
      icon: icons.menu,
      activeIcon: icons.menu,
      title: 'Menu',
      component: <BlankScreen name="Menu" />,
    },
  ];

  // #region renders
  const renderTopbar = () => {
    const opacity = homeScrollTranslateY.interpolate({
      inputRange: [0, headerHeightRef.current],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.topbar.container, {opacity}]}
        onLayout={event => {
          const h = event.nativeEvent.layout.height;
          headerHeightRef.current = h;
          setHeaderHeight(h);
        }}>
        <Text style={styles.topbar.facebookTitle}>facebook</Text>
        <View style={styles.topbar.rightContainer}>
          <CircleIconButton
            icon={icons.search}
            style={{marginRight: Spacing.M}}
          />
          <CircleIconButton
            icon={icons.messenger}
            badge={4}
            onPress={() => openApp('https://www.m.me')}
          />
        </View>
      </Animated.View>
    );
  };

  const renderTabbar = () => {
    const indicatorX = tabScreenScrollX.interpolate({
      inputRange: [0, Sizes.width * tabs.length],
      outputRange: [0, Sizes.width],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.tabbar.container}>
        {tabs.map((tab, index) => (
          <HomeTabButton
            key={'tab' + index}
            icon={tab.icon}
            activeIcon={tab.activeIcon}
            isActive={index === activeTabIndex}
            onPress={() => setActiveTabIndex(index)}
          />
        ))}
        <Animated.View
          style={[
            styles.tabbar.indicator,
            {
              width: Sizes.width / tabs.length,
              transform: [{translateX: indicatorX}],
            },
          ]}
        />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header(headerHeight)}>
        <Animated.View
          style={{
            backgroundColor: Colors.white,
            transform: [{translateY: homeScrollTranslateY ?? 0}],
          }}>
          {renderTopbar()}
          {renderTabbar()}
        </Animated.View>
      </View>
    );
  };

  const renderTabScreenItem = ({item, index}) => {
    return (
      <View key={'tabscreen' + index} style={styles.screen.container}>
        {item.component ?? (
          <Text style={{color: Colors.black}}>{item.title}</Text>
        )}
      </View>
    );
  };

  const renderTabScreen = () => {
    return (
      <Animated.FlatList
        ref={tabScreenFlatListRef}
        data={tabs}
        renderItem={renderTabScreenItem}
        style={styles.screen.scrollView}
        bounces={false}
        horizontal={true}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        getItemLayout={getTabScreenItemLayout}
        onMomentumScrollEnd={handleTabScreenScrollEnd}
        onMomentumScrollBegin={handleTabScreenScrollEnd}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: tabScreenScrollX}}}],
          {useNativeDriver: true},
        )}
        // #region for nested horizontal scrollview to work: https://github.com/facebook/react-native/issues/21436#issuecomment-1204751771
        disableScrollViewPanResponder={true}
        snapToInterval={Sizes.width}
        decelerationRate="fast"
        disableIntervalMomentum={true}
        // #endregion
        directionalLockEnabled
        alwaysBounceVertical={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        automaticallyAdjustContentInsets={false}
        scrollsToTop={false}
      />
    );
  };
  // #endregion

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTabScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.wash,
  },
  topbar: {
    container: {
      padding: Spacing.M,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.nav_bar_background,
    },
    facebookTitle: {
      fontSize: 30,
      color: Colors.primary_button_background,
      fontWeight: FontWeights.heavy,
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  tabbar: {
    container: {
      margin: 0,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: Colors.media_inner_border,
      backgroundColor: Colors.nav_bar_background,
    },
    indicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 2,
      backgroundColor: Colors.primary_button_background,
      borderTopLeftRadius: Radius.M,
      borderTopRightRadius: Radius.M,
    },
  },
  header: headerHeight => ({
    marginTop: -headerHeight,
    backgroundColor: Colors.nav_bar_background,
    zIndex: 3,
  }),
  screen: {
    scrollView: {
      flex: 1,
    },
    container: {
      flex: 1,
      width: Sizes.width,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});
