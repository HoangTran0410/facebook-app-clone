import React, {forwardRef} from 'react';
import {View, Animated, StyleSheet, Text, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {WhatDoYouThink} from '../components';
import {Colors, Sizes} from '../constants/theme';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const HomeScreen = forwardRef(
  ({headerHeight = 0, onScroll, onMomentumScrollEnd}, ref) => {
    const renderItem = ({item, index}) => {
      return (
        <View style={styles.item}>
          <Text>{item}</Text>
        </View>
      );
    };

    const header = (
      <View style={{paddingTop: headerHeight}}>
        <WhatDoYouThink />
      </View>
    );

    return (
      <AnimatedFlatList
        ref={ref}
        style={styles.container}
        ListHeaderComponent={header}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        bounces={false}
        refreshControl={<RefreshControl refreshing={false} />}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizes.width,
    height: 200,
    marginBottom: 20,
    backgroundColor: Colors.red,
  },
});
