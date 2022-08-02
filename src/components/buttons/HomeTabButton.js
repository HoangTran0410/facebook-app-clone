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
    // borderBottomWidth: 2,
    // borderBottomColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  containerActive: {
    // borderBottomColor: Colors.primary,
  },
  icon: {
    width: 35,
    height: 35,
    tintColor: Colors.secondary,
  },
  iconActive: {
    tintColor: Colors.primary,
  },
});
