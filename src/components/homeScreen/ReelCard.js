import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Radius, Spacing} from '../../constants/theme';

export const ReelCard = ({data}) => {
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
    height: 185,
    aspectRatio: 0.53,
    borderRadius: Radius.M,
    borderWidth: 1,
    borderColor: Colors.media_inner_border,
    backgroundColor: Colors.always_dark_overlay,
    marginVertical: Spacing.M,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    opacity: 0.8,
    borderRadius: Radius.L,
    backgroundColor: Colors.always_dark_overlay,
  },
});
