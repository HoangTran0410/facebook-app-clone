import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Radius, Spacing} from '../../constants/theme';

export const Reel = ({data}) => {
  const {src} = data;
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        borderRadius={Radius.L}
        style={styles.image}
        source={{uri: src}}
      />
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
});
