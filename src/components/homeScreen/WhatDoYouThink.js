import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors, FontWeights, Radius, Spacing} from '../../constants/theme';
import {CircleIconButton} from '../common/CircleIconButton';
import {Avatar} from '../common/Avatar';
import * as icons from '../../constants/icons';
import * as images from '../../constants/images';

const randomAvatar = 'https://i.pravatar.cc/50';

export const WhatDoYouThink = () => {
  const buttons = [
    {
      title: 'Trạng thái',
      icon: icons.feeling,
      color: Colors.base_lemon,
    },
    {
      title: 'Nhóm',
      icon: icons.group_filled,
      color: Colors.base_blue,
    },
    {
      title: 'Phát trực tiếp',
      icon: icons.live,
      color: Colors.base_cherry,
    },
    {
      title: 'Check in',
      icon: icons.location_filled,
      color: Colors.fds_red_55,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.block1.container}>
        <Avatar size={50} src={images.hoangtran_avatar} outline />

        <TouchableOpacity style={styles.block1.input.container}>
          <Text style={styles.block1.input.text}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>

        <CircleIconButton
          size={40}
          iconSize={23}
          icon={icons.gallery}
          iconStyle={styles.block1.gallery.icon}
          style={styles.block1.gallery.container}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={styles.block2.container}
        contentContainerStyle={styles.block2.contentContainer}>
        {buttons.map((btn, index) => (
          <TouchableOpacity key={'btns' + index} style={styles.block2.button}>
            <Image source={btn.icon} style={styles.block2.icon(btn.color)} />
            <Text style={styles.block2.text}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block1: {
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.M,
      backgroundColor: Colors.surface_background,
    },
    input: {
      container: {
        flex: 1,
        borderRadius: 25,
        marginHorizontal: Spacing.M,
        paddingVertical: Spacing.M,
        paddingLeft: Spacing.L,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: Colors.comment_background,
      },
      text: {
        fontSize: 16,
        color: Colors.secondary_text,
      },
    },
    gallery: {
      container: {
        backgroundColor: Colors.fds_white,
      },
      icon: {
        tintColor: Colors.base_lime,
      },
    },
  },

  block2: {
    container: {
      flex: 1,
      backgroundColor: Colors.comment_background,
      marginBottom: Spacing.M,
    },
    contentContainer: {
      padding: Spacing.M,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.M,
      paddingVertical: Spacing.S,
      borderRadius: Radius.XL,
      backgroundColor: Colors.fds_white,
      marginRight: Spacing.S,
      borderWidth: 1,
      borderColor: Colors.media_inner_border,
    },
    icon: color => ({width: 20, height: 20, tintColor: color}),
    text: {
      fontWeight: FontWeights.semiBold,
      color: Colors.fds_black,
      marginLeft: Spacing.S,
    },
  },
});
