import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, FontWeights, Spacing} from '../../constants/theme';
import {CreateReelCard, ReelCard} from './ReelCard';
import {CreateStoryCard, StoryCard} from './StoryCard';
import {stories, reels} from '../../mocks';

export const StoriesAndReels = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const flatListRef = useRef([]);

  const changeTab = index => {
    setCurrentTabIndex(index);
    flatListRef.current[index]?.scrollToOffset({animated: true, offset: 0});
  };

  const renderStoryItem = ({item, index}) => {
    return <StoryCard data={item} />;
  };

  const renderReelItem = ({item, index}) => {
    return <ReelCard data={item} />;
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const tabs = [
    {
      title: 'Tin',
      data: stories,
      renderItem: renderStoryItem,
      headerComponent: <CreateStoryCard style={styles.separator} />,
    },
    {
      title: 'Reels',
      data: reels,
      renderItem: renderReelItem,
      headerComponent: <CreateReelCard style={styles.separator} />,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((item, index) => {
          const isActive = index === currentTabIndex;
          return (
            <TouchableOpacity
              key={'tabs' + index}
              style={[styles.tabButton, isActive ? styles.tabButtonActive : {}]}
              onPress={() => changeTab(index)}>
              <Text
                style={[
                  styles.tabTitle,
                  isActive ? styles.tabTitleActive : {},
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* FlatLists */}
      {tabs.map((item, index) => {
        return (
          <FlatList
            horizontal
            key={'storiesAndReels' + index}
            ref={ref => (flatListRef.current[index] = ref)}
            contentContainerStyle={styles.listContentContainer}
            style={[
              styles.list,
              currentTabIndex === index ? {} : styles.listHidden,
            ]}
            ListHeaderComponent={item.headerComponent}
            data={item.data}
            renderItem={item.renderItem}
            ItemSeparatorComponent={renderSeparator}
          />
        );
      })}
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
    paddingHorizontal: Spacing.M,

    // shadow - must have background color to work
    backgroundColor: Colors.surface_background,
    shadowColor: Colors.always_black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
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
  tabTitle: {
    color: Colors.secondary_text,
    fontWeight: FontWeights.heavy,
    fontSize: 15,
  },
  tabTitleActive: {
    color: Colors.base_blue,
  },
  list: {},
  listContentContainer: {
    paddingHorizontal: Spacing.M,
  },
  listHidden: {
    height: 0,
    width: 0,
  },
  separator: {
    marginRight: Spacing.S,
  },
});
