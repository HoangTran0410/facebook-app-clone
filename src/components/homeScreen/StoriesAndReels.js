import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, FontWeights, Spacing} from '../../constants/theme';
import {Reel} from './Reel';
import {Story} from './Story';
import {stories, reels} from '../../mocks';

export const StoriesAndReels = () => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  const renderStoryItem = ({item, index}) => {
    return <Story data={item} />;
  };

  const renderReelItem = ({item, index}) => {
    return <Reel data={item} />;
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
        contentContainerStyle={styles.listContentContainer}
        style={[styles.list, currentTabIndex === 0 ? {} : styles.listHidden]}
        data={stories}
        renderItem={renderStoryItem}
      />
      <FlatList
        horizontal
        contentContainerStyle={styles.listContentContainer}
        style={[styles.list, currentTabIndex === 1 ? {} : styles.listHidden]}
        data={reels}
        renderItem={renderReelItem}
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
  listContentContainer: {
    paddingHorizontal: Spacing.M,
  },
  listHidden: {
    height: 0,
    width: 0,
    backgroundColor: 'red',
  },
});
