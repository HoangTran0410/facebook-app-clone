import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors, FontWeights, Radius, Spacing} from '../../constants/theme';
import {Avatar} from '../common/Avatar';

export const Story = ({data}) => {
  const {user, src} = data;
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        borderRadius={Radius.L}
        style={styles.image}
        source={{uri: src}}
      />
      <Avatar
        src={{uri: user?.avatar}}
        size={40}
        outline={true}
        containerStyle={styles.avatar}
      />
      <Text style={styles.userName}>{user?.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    aspectRatio: 0.55,
    borderRadius: Radius.L,
    backgroundColor: Colors.always_dark_overlay,
    marginLeft: Spacing.S,
    marginVertical: Spacing.M,
  },
  image: {
    flex: 1,
    opacity: 0.8,
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
  },
});
