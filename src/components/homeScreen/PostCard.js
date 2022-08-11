import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Sizes, Spacing} from '../../constants/theme';
import * as icons from '../../constants/icons';

export const PostCard = ({data}) => {
  const {user, timeStamp, caption, attachments} = data;
  const isShowFullCaption = caption.length > 100;

  const actionButtons = [
    {icon: icons.like, text: 'Thích', onPress: null},
    {icon: icons.comment, text: 'Bình luận', onPress: null},
    {icon: icons.share, text: 'Chia sẻ', onPress: null},
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}></View>

      {/* Caption */}
      <View style={styles.caption.container}>
        <Text style={styles.caption.text}>{caption}</Text>
      </View>

      {/* Attachments */}
      <View style={styles.attachments}></View>

      {/* Statistic */}
      <View style={styles.statistics}></View>

      {/* Action Button */}
      <View style={styles.actionButton.container}>
        {actionButtons.map((item, index) => (
          <ActionButton
            key={'action-btn' + index}
            icon={item.icon}
            text={item.text}
            onPress={item.onPress}
          />
        ))}
      </View>
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
  header: {},
  caption: {
    container: {
      width: '100%',
      paddingVertical: Spacing.S,
      paddingHorizontal: Spacing.L,
    },
    text: {
      textAlign: 'left',
      color: Colors.primary_text,
    },
  },
  attachments: {},
  statistics: {},
  actionButton: {
    container: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderColor: Colors.media_inner_border,
    },
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
