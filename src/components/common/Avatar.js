import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {Colors} from '../../constants/theme';

const outlineWidth = 2;
const outlineSpacing = 4;

export const Avatar = ({src, size = 70, onPress, outline, containerStyle}) => {
  const imgSize = outline ? size - outlineWidth * 2 - outlineSpacing : size;
  return (
    <TouchableOpacity
      style={[styles.container(size), containerStyle]}
      onPress={onPress}>
      <Image source={src} style={styles.image(imgSize)} />
      {!!outline && <View style={styles.outline(size)} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: size => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: Colors.fds_black_alpha_20,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  outline: size => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: Colors.transparent,
    borderWidth: outlineWidth,
    borderColor: Colors.base_blue,
  }),
  image: size => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: Colors.secondary_button_background,
  }),
});
