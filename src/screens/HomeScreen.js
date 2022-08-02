import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Animated,
} from 'react-native';
import {CircleIconButton, HomeTabButton} from '../components';
import {
  bell,
  bell_filled,
  feed,
  feed_filled,
  home,
  home_filled,
  menu,
  messenger,
  search,
  user,
  user_filled,
} from '../constants/icons';
import {Colors, FontWeights, Sizes, Spacing} from '../constants/theme';

export const HomeScreen = ({}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = [
    {icon: home, activeIcon: home_filled, title: 'Home'},
    {icon: user, activeIcon: user_filled, title: 'Profile'},
    {icon: feed, activeIcon: feed_filled, title: 'Feed'},
    {icon: bell, activeIcon: bell_filled, title: 'Notifications'},
    {icon: menu, activeIcon: menu, title: 'Menu'},
  ];

  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollViewRef.current?.scrollTo({x: Sizes.width * activeTabIndex});
  }, [activeTabIndex]);

  // #region handlers
  const handleScrollEnd = event => {
    const x = event.nativeEvent.contentOffset.x;
    const tabIndex = Math.round(x / Sizes.width);

    setActiveTabIndex(tabIndex);
  };
  // #endregion

  // #region renders
  const renderHeader = () => {
    return (
      <View style={styles.header.container}>
        <Text style={styles.header.facebookTitle}>facebook</Text>
        <View style={styles.header.rightContainer}>
          <CircleIconButton icon={search} style={{marginRight: Spacing.L}} />
          <CircleIconButton icon={messenger} badge={4} />
        </View>
      </View>
    );
  };

  const renderTabbar = () => {
    const indicatorX = scrollX.interpolate({
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

  const renderScreen = () => {
    return (
      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.screen.scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX, y: scrollY}}}], {
          useNativeDriver: true,
        })}>
        {tabs.map((tab, index) => (
          <View key={index + ''} style={styles.screen.container}>
            <Text style={{color: Colors.black}}>{tab.title}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };
  // #endregion

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTabbar()}
      {renderScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
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
      width: Sizes.width,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});
