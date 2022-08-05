import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors, FontWeights, Radius, Spacing} from '../../constants/theme';
import {Avatar} from '../common/Avatar';

export const Story = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: `https://picsum.photos/seed/${Math.random()}/200/300`}}
      />
      <Avatar size={40} outline={true} containerStyle={styles.avatar} />
      <Text style={styles.userName}>Hoang Tran</Text>
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
    borderRadius: Radius.L,
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
