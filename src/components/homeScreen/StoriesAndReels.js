import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, FontWeights, Spacing} from '../../constants/theme';
import {Reel} from './Reel';
import {Story} from './Story';

export const StoriesAndReels = () => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  const renderItem = ({item, index}) => {
    return currentTabIndex === 0 ? <Story /> : <Reel />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {[{text: 'Tin'}, {text: 'Reels'}].map((item, index) => {
          const isActive = index === currentTabIndex;
          return (
            <TouchableOpacity
              key={'tabs' + index}
              style={[styles.tabButton, isActive ? styles.tabButtonActive : {}]}
              onPress={() => setCurrentTabIndex(index)}>
              <Text
                style={[styles.tabText, isActive ? styles.tabTextActive : {}]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        horizontal
        style={styles.list}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface_background,
    marginBottom: Spacing.M,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.L,
  },
  tabButton: {
    flex: 1,
    paddingVertical: Spacing.M,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.fds_white,
    borderBottomWidth: 2,
    borderBottomColor: Colors.transparent,
  },
  tabButtonActive: {
    borderBottomColor: Colors.base_blue,
  },
  tabText: {
    color: Colors.primary_text,
    fontWeight: FontWeights.bold,
    fontSize: 15,
  },
  tabTextActive: {
    color: Colors.base_blue,
  },
  list: {},
});
