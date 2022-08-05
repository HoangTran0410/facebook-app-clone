import React, {forwardRef} from 'react';
import {View, Animated, StyleSheet, Text, RefreshControl} from 'react-native';
import {StoriesAndReels, WhatDoYouThink} from '../components';
import {Colors, Sizes, Spacing} from '../constants/theme';

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
        <StoriesAndReels />
      </View>
    );

    return (
      <Animated.FlatList
        ref={ref}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        ListHeaderComponent={header}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        bounces={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={[Colors.base_blue]}
            tintColor={Colors.base_blue}
          />
        }
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
    marginBottom: Spacing.M,
    backgroundColor: Colors.comment_background,
  },
});
