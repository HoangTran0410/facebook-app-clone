import React, {forwardRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Spacing} from '../../../constants/theme';

export const ActionButton = forwardRef(
  ({icon, text, onPress, onLongPress}, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        style={styles.container}
        onPress={onPress}
        onLongPress={onLongPress}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.M,
  },
  icon: {width: 25, height: 25, tintColor: Colors.secondary_icon},
  text: {
    fontSize: 13,
    marginLeft: Spacing.XS,
    color: Colors.secondary_text,
  },
});
