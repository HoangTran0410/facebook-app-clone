import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Sizes, Spacing} from '../../constants/theme';

export const PostCard = ({data}) => {
  const {user, timeStamp, caption, attachments} = data;
  return (
    <View style={styles.container}>
      <Text>PostCard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizes.width,
    height: 200,
    marginBottom: Spacing.M,
    backgroundColor: Colors.comment_background,
  },
});
