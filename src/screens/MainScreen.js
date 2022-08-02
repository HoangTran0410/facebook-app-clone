import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Animated} from 'react-native';
import {CircleIconButton, HomeTabButton} from '../components';
import {Colors, FontWeights, Sizes, Spacing} from '../constants/theme';
import * as icons from '../constants/icons';
import {HomeScreen} from './HomeScreen';
import {getCloser} from '../helpers/utils';

export const MainScreen = ({}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // #region useRef
  const headerHeightRef = useRef(0);
  const scrollViewRef = useRef(null);
  const homeFlatlistRef = useRef(null);
  const tabScreenScrollX = useRef(new Animated.Value(0)).current;
  const homeScrollY = useRef(new Animated.Value(0)).current;

  const homeScrollYNumber = useRef(0);
  homeScrollY.addListener(({value}) => {
    homeScrollYNumber.current = value;
  });

  const homeScrollYClamped = Animated.diffClamp(
    homeScrollY,
    0,
    headerHeightRef.current,
  );
  const homeScrollTranslateY = homeScrollYClamped.interpolate({
    inputRange: [0, headerHeightRef.current],
    outputRange: [headerHeightRef.current, 0],
  });

  const translateYNumber = useRef();
  homeScrollTranslateY.addListener(({value}) => {
    translateYNumber.current = value;
  });
  // #endregion

  useEffect(() => {
    scrollViewRef.current?.scrollTo({x: Sizes.width * activeTabIndex});
    setOpenTopbar(activeTabIndex === 0);
  }, [activeTabIndex]);

  // #region handlers
  const handleTabScreenScrollEnd = event => {
    const x = event.nativeEvent.contentOffset.x;
    const tabIndex = Math.round(x / Sizes.width);

    setActiveTabIndex(tabIndex);
  };

  const onScrollHome = Animated.event(
    [{nativeEvent: {contentOffset: {y: homeScrollY}}}],
    {useNativeDriver: true},
  );

  // https://medium.com/swlh/making-a-collapsible-sticky-header-animations-with-react-native-6ad7763875c3
  const handleSnap = ({nativeEvent}) => {
    const offsetY = nativeEvent.contentOffset.y;
    const ty = translateYNumber.current;
    const hh = headerHeightRef.current;

    if (!(ty === 0 || ty === hh) && homeFlatlistRef.current) {
      homeFlatlistRef.current.scrollToOffset({
        offset:
          getCloser(ty, hh, 0) === hh ? offsetY - (hh - ty) : offsetY + ty,
      });
    }
  };

  const setOpenTopbar = isOpen => {
    if (homeFlatlistRef.current) {
      homeFlatlistRef.current.scrollToOffset({
        offset:
          homeScrollYNumber.current +
          (isOpen ? -1 : 1) * headerHeightRef.current,
      });
    }
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
    return (
      <View
        style={styles.topbar.container}
        onLayout={event =>
          (headerHeightRef.current = event.nativeEvent.layout.height)
        }>
        <Text style={styles.topbar.facebookTitle}>facebook</Text>
        <View style={styles.topbar.rightContainer}>
          <CircleIconButton
            icon={icons.search}
            style={{marginRight: Spacing.L}}
          />
          <CircleIconButton icon={icons.messenger} badge={4} />
        </View>
      </View>
    );
  };

  const renderTabbar = () => {
    const indicatorX = tabScreenScrollX.interpolate({
      inputRange: [0, Sizes.width * tabs.length],
      outputRange: [0, Sizes.width],
    });

    return (
      <View style={styles.tabbar.container}>
        {tabs.map((tab, index) => (
          <HomeTabButton
            key={'tab' + index}
            icon={tab.icon}
            activeIcon={tab.activeIcon}
            isActive={index === activeTabIndex}
            onPress={() => {
              setActiveTabIndex(index);
            }}
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
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{marginTop: -headerHeightRef.current, zIndex: 2}}>
        <Animated.View
          style={{
            backgroundColor: Colors.white,
            transform: [{translateY: homeScrollTranslateY}],
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
        scrollEventThrottle={16}
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
    backgroundColor: 'white',
  },
  topbar: {
    container: {
      padding: Spacing.M,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    facebookTitle: {
      fontSize: 30,
      color: Colors.primary,
      fontWeight: FontWeights.heavy,
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  tabbar: {
    container: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: Colors.secondary,
    },
    indicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 3,
      backgroundColor: Colors.primary,
    },
  },
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
