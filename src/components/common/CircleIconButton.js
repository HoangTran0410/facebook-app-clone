import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, Text} from 'react-native';
import {Colors, FontWeights, Radius, Spacing} from '../../constants/theme';
import {Badge} from './Badge';

export const CircleIconButton = ({
  icon,
  onPress,
  badge,
  size = 37,
  iconSize = 23,
  style,
  iconStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container(size), style]}>
      <Image source={icon} style={[styles.icon(iconSize), iconStyle]} />
      {badge && <Badge value={badge} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: size => ({
    width: size,
    height: size,
    borderRadius: Radius.XL,
    padding: Spacing.S,
    backgroundColor: Colors.secondary_button_background,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  icon: iconSize => ({
    width: iconSize,
    height: iconSize,
    tintColor: Colors.primary_icon,
  }),
});
