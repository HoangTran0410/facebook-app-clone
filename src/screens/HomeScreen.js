import React, {forwardRef} from 'react';
import {View, Animated, StyleSheet, Text} from 'react-native';
import {Colors, Sizes} from '../constants/theme';

export const HomeScreen = forwardRef(
  ({headerHeight, onScroll, onMomentumScrollEnd}, ref) => {
    const renderItem = ({item, index}) => {
      return (
        <View style={styles.item}>
          <Text>{item}</Text>
        </View>
      );
    };

    const renderHeader = () => {
      return <View style={{paddingTop: headerHeight}} />;
    };

    return (
      <Animated.FlatList
        ref={ref}
        style={styles.container}
        ListHeaderComponent={renderHeader}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
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
