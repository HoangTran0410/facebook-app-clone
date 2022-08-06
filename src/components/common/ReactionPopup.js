import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import * as icons from '../../constants/icons';
import {Colors, Spacing} from '../../constants/theme';

const reactions = [
  {name: 'like', icon: icons.reaction_like},
  {name: 'love', icon: icons.reaction_love},
  {name: 'care', icon: icons.reaction_care},
  {name: 'haha', icon: icons.reaction_haha},
  {name: 'wow', icon: icons.reaction_wow},
  {name: 'sad', icon: icons.reaction_sad},
  {name: 'angry', icon: icons.reaction_angry},
];

export const ReactionPopup = ({style, onChooseReact = () => {}}) => {
  return (
    <View style={[styles.container, style]}>
      {reactions.map(({name, icon}, index) => (
        <TouchableOpacity
          key={'reaction' + index}
          onPress={() => onChooseReact(name)}>
          <Image source={icon} style={styles.icon(index)} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Spacing.XS,
    borderRadius: 100,

    backgroundColor: Colors.surface_background,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  icon: index => ({
    width: 40,
    height: 40,
    marginLeft: index === 0 ? 0 : Spacing.XS,
  }),
});
