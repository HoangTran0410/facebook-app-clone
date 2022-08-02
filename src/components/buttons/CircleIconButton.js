import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, Text} from 'react-native';
import {Colors, FontWeights, Radius, Spacing} from '../../constants/theme';

export const CircleIconButton = ({icon, onPress, badge, style, iconStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image source={icon} style={[styles.icon, iconStyle]} />
      {badge && (
        <View style={styles.badge.container}>
          <Text style={styles.badge.text}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.XL,
    padding: Spacing.S,
    backgroundColor: Colors.gray,
  },
  icon: {
    width: 27,
    height: 27,
    tintColor: Colors.black,
  },
  badge: {
    container: {
      position: 'absolute',
      top: Spacing.XXS,
      right: Spacing.XXS,
      borderRadius: Radius.L,
      backgroundColor: Colors.red,
      width: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: Colors.white,
      fontWeight: FontWeights.bold,
      fontSize: 12,
    },
  },
});
