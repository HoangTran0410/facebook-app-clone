import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Spacing} from '../../../constants/theme';

export const AttachmentItem = ({uri, onPress, style, overlayText}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {flex: 1, width: '100%', height: 200, padding: Spacing.XS / 2},
        style,
      ]}>
      <Image
        source={{uri}}
        resizeMode="cover"
        style={{width: '100%', height: '100%'}}
      />
      {overlayText != null && (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: Colors.fds_black_alpha_50,
            justifyContent: 'center',
            alignItems: 'center',
            margin: Spacing.XS / 2,
          }}>
          <Text style={{fontSize: 23, color: Colors.primary_button_text}}>
            {overlayText}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
