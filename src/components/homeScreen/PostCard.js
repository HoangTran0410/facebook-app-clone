import React, {useRef, forwardRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Sizes, Spacing} from '../../constants/theme';
import * as icons from '../../constants/icons';
import {useStore} from '../../store/store';
import {uiSelectors} from '../../store/uiSlice';

export const PostCard = ({data}) => {
  const setReactionPopupPosition = useStore(
    uiSelectors.setReactionPopupPosition,
  );

  const {user, timeStamp, caption, attachments} = data;
  const isShowFullCaption = caption.length > 100;

  const likeBtnRef = useRef(null);

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
        <ActionButton
          ref={likeBtnRef}
          icon={icons.like}
          text={'Thích'}
          onPress={null}
          onLongPress={() => {
            likeBtnRef.current?.measure((x, y, width, height, pageX, pageY) => {
              setReactionPopupPosition({
                x: pageX,
                y: pageY - height - Spacing.M,
              });
            });
          }}
        />
        <ActionButton icon={icons.comment} text={'Bình luận'} onPress={null} />
        <ActionButton icon={icons.share} text={'Chia sẻ'} onPress={null} />
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

const ActionButton = forwardRef(({icon, text, onPress, onLongPress}, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      style={actionButtonStyles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Image source={icon} style={actionButtonStyles.icon} />
      <Text style={actionButtonStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
});

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
