import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CircleIconButton, HomeTabButton} from '../components';
import {Colors, FontWeights, Radius, Sizes, Spacing} from '../constants/theme';
import {useHomeScrollEffect} from '../hooks/useHomeScrollEffect';
import {HomeScreen} from './HomeScreen';
import * as icons from '../constants/icons';

export const MainScreen = ({}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  // #region useRef
  const scrollViewRef = useRef(null);
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
    scrollViewRef.current?.scrollTo({x: Sizes.width * activeTabIndex});
    setOpenTopbar(activeTabIndex === 0);
  }, [activeTabIndex]);
  // #endregion

  // #region handlers
  const handleTabScreenScrollEnd = event => {
    const x = event.nativeEvent.contentOffset.x;
    const tabIndex = Math.round(x / Sizes.width);

    setActiveTabIndex(tabIndex);
  };
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
    {icon: icons.user, activeIcon: icons.user_filled, title: 'Profile'},
    {icon: icons.feed, activeIcon: icons.feed_filled, title: 'Feed'},
    {icon: icons.bell, activeIcon: icons.bell_filled, title: 'Notifications'},
    {icon: icons.menu, activeIcon: icons.menu, title: 'Menu'},
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
            style={{marginRight: Spacing.L}}
          />
          <CircleIconButton icon={icons.messenger} badge={4} />
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

  const renderTabScreen = () => {
    return (
      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.screen.scrollView}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        bounces={false}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
        scrollEventThrottle={16}
        // contentOffset={{x: Sizes.width * activeTabIndex}}
        onMomentumScrollEnd={handleTabScreenScrollEnd}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: tabScreenScrollX}}}],
          {useNativeDriver: true},
        )}>
        {tabs.map((tab, index) => (
          <View key={'tabscreen' + index} style={styles.screen.container}>
            {tab.component ?? (
              <Text style={{color: Colors.black}}>{tab.title}</Text>
            )}
          </View>
        ))}
      </Animated.ScrollView>
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
      borderBottomWidth: 2,
      borderColor: Colors.media_inner_border,
      backgroundColor: Colors.nav_bar_background,
    },
    indicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 3,
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
