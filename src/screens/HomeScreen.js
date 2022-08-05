import React, {forwardRef} from 'react';
import {View, Animated, StyleSheet, RefreshControl} from 'react-native';
import {StoriesAndReels, WhatDoYouThink, PostCard} from '../components';
import {Colors} from '../constants/theme';
import {posts} from '../mocks';

export const HomeScreen = forwardRef(
  ({headerHeight = 0, onScroll, onMomentumScrollEnd}, ref) => {
    const renderItem = ({item, index}) => {
      return <PostCard data={item} />;
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
        overScrollMode="never"
        style={styles.container}
        ListHeaderComponent={header}
        data={posts}
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
});
