import React, {useRef, forwardRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Sizes, Spacing} from '../../constants/theme';
import * as icons from '../../constants/icons';
import {useStore} from '../../store/store';
import {uiSelectors} from '../../store/uiSlice';
import {NumberFormat} from '../../helpers/utils';
import {reactions} from '../../constants/global';

const maxLengthCaption = 200;

export const PostCard = ({data}) => {
  // #region state/ref/zustand
  const setReactionPopupPosition = useStore(
    uiSelectors.setReactionPopupPosition,
  );

  const [isReadMore, setIsReadMore] = useState(false);
  const likeBtnRef = useRef(null);
  // #endregion

  // #region calculate
  const {user, timeStamp, caption, attachments, statistics} = data;
  const isLongText = caption.length > maxLengthCaption;
  const willShowReadMore = isLongText && !isReadMore;
  const _caption =
    (isReadMore && isLongText) || !isLongText
      ? caption
      : caption.substring(0, maxLengthCaption);
  const reactionsCount = Object.values(statistics.reactions).reduce(
    (acc, cur) => acc + cur,
    0,
  );
  const sortedReactionKeys = Object.keys(statistics.reactions).sort((a, b) => {
    return statistics.reactions[b] - statistics.reactions[a];
  });
  const topReactions = reactions.filter(_ => {
    return (
      sortedReactionKeys.slice(0, 3).includes(_.id) && // top 3 reactions
      statistics.reactions[_.id] > reactionsCount / 100 // at least 1% of total reactions
    );
  });
  // #endregion

  // #region handlers
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const copyCaption = () => {};

  const openComment = () => {};
  // #endregion

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}></View>

      {/* Caption */}
      <TouchableOpacity
        style={styles.caption.container}
        onPress={toggleReadMore}
        onLongPress={copyCaption}>
        <Text style={styles.caption.text}>
          {_caption}
          {willShowReadMore && (
            <Text style={styles.caption.readMore}>... Xem thêm</Text>
          )}
        </Text>
      </TouchableOpacity>

      {/* Attachments */}
      <View style={styles.attachments}></View>

      {/* Statistic */}
      <TouchableOpacity
        style={styles.statistics.container}
        onPress={openComment}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row-reverse'}}>
            {topReactions.reverse().map((_, index) => (
              <View
                key={_.id}
                style={{
                  padding: Spacing.XS / 2,
                  backgroundColor: Colors.surface_background,
                  borderRadius: 100,
                  marginRight: -Spacing.XS * 2,
                }}>
                <Image
                  source={_.icon}
                  style={{width: 18, height: 18, borderRadius: 18}}
                />
              </View>
            ))}
          </View>
          <Text style={{marginLeft: Spacing.M}}>
            {NumberFormat.thousand(reactionsCount)}
          </Text>
        </View>
        <View style={styles.statistics.rightContainer}>
          <Text>{NumberFormat.thousand(statistics.comments)} bình luận</Text>
          <View style={styles.statistics.dot} />
          <Text>{NumberFormat.thousand(statistics.shares)} lượt chia sẻ</Text>
        </View>
      </TouchableOpacity>

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
    readMore: {
      color: Colors.secondary_text,
    },
  },
  attachments: {},
  statistics: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Spacing.S,
      paddingHorizontal: Spacing.L,
    },
    rightContainer: {flexDirection: 'row', alignItems: 'center'},
    dot: {
      width: Spacing.XS,
      height: Spacing.XS,
      borderRadius: Spacing.XS,
      backgroundColor: Colors.secondary_text,
      marginHorizontal: Spacing.S,
    },
  },
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
