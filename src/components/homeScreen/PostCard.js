import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Sizes, Spacing} from '../../constants/theme';
import {ReactionPopup} from '../common/ReactionPopup';
import * as icons from '../../constants/icons';

export const PostCard = ({data}) => {
  const {user, timeStamp, caption, attachments} = data;

  const actionButtons = [
    {icon: icons.like, text: 'Thích', onPress: null},
    {icon: icons.comment, text: 'Bình luận', onPress: null},
    {icon: icons.share, text: 'Chia sẻ', onPress: null},
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View></View>

      {/* Caption */}
      <View></View>

      {/* Attachments */}
      <View></View>

      {/* Statistic */}
      <View></View>

      {/* Action Button */}
      <View style={styles.actionButtonContainer}>
        {actionButtons.map((item, index) => (
          <ActionButton
            icon={item.icon}
            text={item.text}
            onPress={item.onPress}
          />
        ))}
      </View>

      {/* Reactions popup */}
      <ReactionPopup style={{}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizes.width,
    marginBottom: Spacing.M,
    backgroundColor: Colors.surface_background,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Colors.media_inner_border,
  },
});

const ActionButton = ({icon, text, onPress}) => {
  return (
    <TouchableOpacity style={actionButtonStyles.container} onPress={onPress}>
      <Image source={icon} style={actionButtonStyles.icon} />
      <Text style={actionButtonStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const actionButtonStyles = StyleSheet.create({
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
