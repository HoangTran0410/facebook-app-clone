import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontWeights, Radius, Spacing} from '../../constants/theme';

export const Badge = ({value, style}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: Radius.L,
    backgroundColor: Colors.notification_badge,
    width: Spacing.L,
    height: Spacing.L,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.primary_button_text,
    fontWeight: FontWeights.bold,
    fontSize: 10,
  },
});
