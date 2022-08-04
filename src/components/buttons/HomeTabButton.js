import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Spacing} from '../../constants/theme';

export const HomeTabButton = ({
  icon,
  activeIcon,
  onPress,
  isActive = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, isActive ? styles.containerActive : null]}>
      <Image
        source={isActive ? activeIcon : icon}
        style={[styles.icon, isActive ? styles.iconActive : null]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Spacing.M,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerActive: {},
  icon: {
    width: 30,
    height: 30,
    tintColor: Colors.secondary_icon,
  },
  iconActive: {
    tintColor: Colors.primary_button_background,
  },
});
