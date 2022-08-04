import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, Text} from 'react-native';
import {Colors, FontWeights, Radius, Spacing} from '../../constants/theme';

export const CircleIconButton = ({
  icon,
  onPress,
  badge,
  size = 40,
  iconSize = 25,
  style,
  iconStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container(size), style]}>
      <Image source={icon} style={[styles.icon(iconSize), iconStyle]} />
      {badge && (
        <View style={styles.badge.container}>
          <Text style={styles.badge.text}>{badge}</Text>
        </View>
      )}
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
  badge: {
    container: {
      position: 'absolute',
      top: Spacing.XXS,
      right: Spacing.XXS,
      borderRadius: Radius.L,
      backgroundColor: Colors.notification_badge,
      width: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: Colors.primary_button_text,
      fontWeight: FontWeights.bold,
      fontSize: 12,
    },
  },
});
