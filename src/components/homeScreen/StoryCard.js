import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Colors, FontWeights, Radius, Spacing} from '../../constants/theme';
import {Avatar} from '../common/Avatar';
import * as icons from '../../constants/icons';
import {me} from '../../mocks';

export const StoryCard = ({data}) => {
  const {user, src} = data;
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        style={styles.story.image}
        source={{uri: src}}
        resizeMode="cover"
      />
      <Avatar
        src={{uri: user?.avatar}}
        size={40}
        outline={user?.hasStory}
        containerStyle={styles.story.avatar}
      />
      <Text style={styles.story.userName}>{user?.name}</Text>
    </TouchableOpacity>
  );
};

export const CreateStoryCard = ({style}) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Image style={styles.createStory.image} source={{uri: me?.avatar}} />
      <View style={styles.createStory.bottomContainer}>
        <View style={styles.createStory.button}>
          <Image source={icons.plus} style={styles.createStory.icon} />
        </View>
        <Text style={styles.createStory.text}>Tạo tin</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 185,
    aspectRatio: 0.53,
    borderRadius: Radius.M,
    borderWidth: 1,
    borderColor: Colors.media_inner_border,
    backgroundColor: Colors.always_dark_overlay,
    marginVertical: Spacing.M,
    overflow: 'hidden',
  },
  story: {
    image: {
      flex: 1,
      borderRadius: Radius.L,
      backgroundColor: Colors.always_dark_overlay,
    },
    avatar: {
      position: 'absolute',
      top: 0,
      left: 0,
      margin: Spacing.S,
    },
    userName: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      margin: Spacing.S,
      color: Colors.primary_button_text,
      fontWeight: FontWeights.bold,
      fontSize: 13,
    },
  },
  createStory: {
    image: {
      height: 120,
      width: null,
    },
    bottomContainer: {
      backgroundColor: Colors.surface_background,
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
    },
    button: {
      borderColor: Colors.surface_background,
      borderWidth: 3,
      borderRadius: 100,
      backgroundColor: Colors.base_blue,
      marginTop: -35 / 2,
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: Colors.fds_white,
    },
    text: {
      color: Colors.primary_text,
      fontWeight: FontWeights.bold,
      marginBottom: Spacing.XS,
    },
  },
});
