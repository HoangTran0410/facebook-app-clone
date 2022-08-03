import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Colors} from '../../constants/theme';

export const Avatar = ({src, size, onPress, outline, status}) => {
  return (
    <TouchableOpacity style={styles.container(size)} onPress={onPress}>
      <Image source={src} style={styles.image(size)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: size => ({
    width: size,
    height: size,
    borderRadius: size / 2,
  }),
  image: size => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: Colors.secondary_button_background,
  }),
});
