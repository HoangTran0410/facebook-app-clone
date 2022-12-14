import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, FontWeights, Sizes, Spacing} from '../../constants/theme';
import * as icons from '../../constants/icons';
import {useStore} from '../../store/store';
import {uiSelectors} from '../../store/uiSlice';
import {NumberFormat} from '../../helpers/utils';
import {reactions} from '../../constants/global';
import {Avatar} from '../common/Avatar';
import {CircleIconButton} from '../common/CircleIconButton';
import {ActionButton} from './postCard/ActionButton';
import {AttachmentsZone} from './postCard/AttachmentZone';

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
  const topReactions = sortedReactionKeys
    .slice(0, 3) // top 3 reactions
    .filter(key => statistics.reactions[key] > reactionsCount / 100) // at least 1% of total reactions
    .map(key => reactions.find(_ => _.id === key));
  // #endregion

  // #region handlers
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const copyCaption = () => {};

  const openComment = () => {};

  const openProfile = () => {};

  const openStory = () => {
    if (user.hasStory) {
      // open story
    } else {
      openProfile();
    }
  };
  // #endregion

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar
          src={{uri: user.avatar}}
          size={40}
          outline={user.hasStory}
          onPress={openStory}
        />

        {/* User name + time */}
        <TouchableOpacity
          style={{flex: 1, paddingHorizontal: Spacing.S}}
          onPress={openProfile}>
          <Text
            style={{
              fontWeight: FontWeights.heavy,
              color: Colors.primary_text,
              fontSize: 16,
            }}>
            {user.name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontWeight: FontWeights.medium,
                color: Colors.secondary_text,
                fontSize: 13,
              }}>
              2 gi???
            </Text>
            <View style={styles.dot} />
            <Image
              source={icons.public_share}
              style={{width: 12, height: 12, tintColor: Colors.secondary_text}}
            />
          </View>
        </TouchableOpacity>

        {/* Action buttons */}
        <CircleIconButton
          icon={icons.more}
          size={30}
          style={{
            alignSelf: 'flex-start',
            backgroundColor: Colors.transparent,
            marginTop: -Spacing.S,
          }}
        />
        <CircleIconButton
          icon={icons.close}
          size={30}
          style={{
            marginTop: -Spacing.S,
            alignSelf: 'flex-start',
            backgroundColor: Colors.transparent,
            borderRadius: 0,
            marginLeft: Spacing.M,
          }}
        />
      </View>

      {/* Caption */}
      <TouchableOpacity
        style={styles.caption.container}
        onPress={toggleReadMore}
        onLongPress={copyCaption}>
        <Text style={styles.caption.text}>
          {_caption}
          {willShowReadMore && (
            <Text style={styles.caption.readMore}>... Xem th??m</Text>
          )}
        </Text>
      </TouchableOpacity>

      {/* Attachments */}
      <AttachmentsZone attachments={attachments} />

      {/* Statistic */}
      <TouchableOpacity
        style={styles.statistics.container}
        onPress={openComment}>
        {/* reactions */}
        <View style={styles.statistics.leftContainer}>
          <View style={styles.statistics.reactionContainer}>
            {topReactions.reverse().map((_, index) => (
              <View key={_.id} style={styles.statistics.reactionItem}>
                <Image source={_.icon} style={styles.statistics.reactionIcon} />
              </View>
            ))}
          </View>
          <Text style={[styles.statistics.text, {marginLeft: Spacing.M}]}>
            {NumberFormat.thousand(reactionsCount)}
          </Text>
        </View>

        {/* comments and share?? */}
        <View style={styles.statistics.rightContainer}>
          <Text style={styles.statistics.text}>
            {NumberFormat.thousand(statistics.comments)} b??nh lu???n
          </Text>
          <View style={styles.statistics.dot} />
          <Text style={styles.statistics.text}>
            {NumberFormat.thousand(statistics.shares)} l?????t chia s???
          </Text>
        </View>
      </TouchableOpacity>

      {/* Action Button */}
      <View style={styles.actionButton.container}>
        <ActionButton
          ref={likeBtnRef}
          icon={icons.like}
          text={'Th??ch'}
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
        <ActionButton icon={icons.comment} text={'B??nh lu???n'} onPress={null} />
        <ActionButton icon={icons.share} text={'Chia s???'} onPress={null} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.M,
    paddingBottom: Spacing.S,
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.secondary_text,
    marginHorizontal: Spacing.S / 1.5,
  },
  caption: {
    container: {
      width: '100%',
      paddingVertical: Spacing.S,
      paddingHorizontal: Spacing.L,
    },
    text: {
      fontWeight: FontWeights.medium,
      fontSize: 16,
      textAlign: 'left',
      color: Colors.primary_text,
    },
    readMore: {
      color: Colors.secondary_text,
    },
  },
  statistics: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Spacing.S,
      paddingHorizontal: Spacing.L,
    },
    reactionContainer: {flexDirection: 'row-reverse'},
    reactionItem: {
      padding: Spacing.XS / 2,
      backgroundColor: Colors.surface_background,
      borderRadius: 100,
      marginRight: -Spacing.XS,
    },
    reactionIcon: {width: 16, height: 16, borderRadius: 18},
    leftContainer: {flex: 1, flexDirection: 'row', alignItems: 'center'},
    rightContainer: {flexDirection: 'row', alignItems: 'center'},
    dot: {
      width: 3,
      height: 3,
      borderRadius: 3,
      backgroundColor: Colors.secondary_text,
      marginHorizontal: Spacing.S,
    },
    text: {
      color: Colors.secondary_text,
      fontSize: 13,
      fontWeight: FontWeights.medium,
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
