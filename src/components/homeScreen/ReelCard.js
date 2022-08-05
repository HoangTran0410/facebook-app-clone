import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {Colors, FontWeights, Radius, Spacing} from '../../constants/theme';
import * as icons from '../../constants/icons';

export const ReelCard = ({data}) => {
  const {src} = data;
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground style={styles.reel.image} source={{uri: src}} />
    </TouchableOpacity>
  );
};

export const CreateReelCard = ({style}) => {
  const maskedIcon = (
    <MaskedView
      style={styles.createReel.maskedIcon.container}
      maskElement={
        <Image
          style={styles.createReel.maskedIcon.icon}
          source={icons.create_reel}
        />
      }>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={[Colors.base_tomato, Colors.base_pink]}
        style={styles.createReel.linearGradient}
      />
    </MaskedView>
  );

  const plusIcon = (
    <View style={styles.createReel.plusIcon.container}>
      <Image source={icons.plus} style={styles.createReel.plusIcon.icon} />
    </View>
  );

  return (
    <TouchableOpacity style={[styles.container, style]}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={[
          Colors.base_lemon,
          Colors.base_tomato,
          Colors.base_pink,
          Colors.base_pink,
        ]}
        style={styles.createReel.linearGradient}>
        {/* Icon container */}
        <View style={styles.createReel.topContainer}>
          <View style={styles.createReel.circleContainer}>
            {maskedIcon}
            {plusIcon}
          </View>
        </View>

        {/* Footer text */}
        <Text style={styles.createReel.text}>Tạo thước phim</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 185,
    aspectRatio: 0.53,
    borderRadius: Radius.M,
    borderWidth: 1,
    borderColor: Colors.media_inner_border,
    backgroundColor: Colors.always_dark_overlay,
    marginVertical: Spacing.M,
    overflow: 'hidden',
  },
  reel: {
    image: {
      flex: 1,
      borderRadius: Radius.L,
      backgroundColor: Colors.always_dark_overlay,
    },
  },
  createReel: {
    linearGradient: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    topContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    circleContainer: {
      borderRadius: 100,
      padding: Spacing.M,
      backgroundColor: Colors.surface_background,
    },
    maskedIcon: {
      container: {width: 35, height: 35},
      icon: {width: '100%', height: '100%', tintColor: Colors.fds_black},
    },
    plusIcon: {
      container: {
        position: 'absolute',
        bottom: -Spacing.XS,
        right: -Spacing.XS,
        padding: Spacing.XS / 2,
        backgroundColor: Colors.surface_background,
        borderRadius: Radius.XL,
        borderWidth: 2,
        borderColor: Colors.base_pink,
      },
      icon: {width: 15, height: 15, tintColor: Colors.base_blue},
    },
    text: {
      textAlign: 'center',
      fontWeight: FontWeights.bold,
      fontSize: 14,
      color: Colors.primary_button_text,
      marginBottom: Spacing.S,
    },
  },
});
