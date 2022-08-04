import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontWeights, Radius, Spacing} from '../../constants/theme';
import {Avatar} from '../common/Avatar';

export const Story = () => {
  return (
    <View style={styles.container}>
      <Avatar size={40} outline={true} containerStyle={styles.avatar} />
      <Text style={styles.userName}>Hoang Tran</Text>
    </View>
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
  avatar: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: Spacing.S,
  },
  userName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: Spacing.S,
    color: Colors.primary_button_text,
    fontWeight: FontWeights.bold,
  },
});
