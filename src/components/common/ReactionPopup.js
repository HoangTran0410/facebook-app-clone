import React, {useEffect, useRef} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  LayoutAnimation,
} from 'react-native';
import {Colors, Spacing} from '../../constants/theme';
import * as icons from '../../constants/icons';

const reactions = [
  {name: 'like', icon: icons.reaction_like},
  {name: 'love', icon: icons.reaction_love},
  {name: 'care', icon: icons.reaction_care},
  {name: 'haha', icon: icons.reaction_haha},
  {name: 'wow', icon: icons.reaction_wow},
  {name: 'sad', icon: icons.reaction_sad},
  {name: 'angry', icon: icons.reaction_angry},
];

// https://www.codedaily.io/tutorials/How-to-make-Facebook-Reactions
// https://medium.com/@duytq94/facebook-reactions-animation-with-react-native-8f750e136ff5
// var reactions = [
//   {id: 'like', img: 'http://i.imgur.com/LwCYmcM.gif'},
//   {id: 'love', img: 'http://i.imgur.com/k5jMsaH.gif'},
//   {id: 'haha', img: 'http://i.imgur.com/f93vCxM.gif'},
//   {id: 'yay', img: 'http://i.imgur.com/a44ke8c.gif'},
//   {id: 'wow', img: 'http://i.imgur.com/9xTkN93.gif'},
//   {id: 'sad', img: 'http://i.imgur.com/tFOrN5d.gif'},
//   {id: 'angry', img: 'http://i.imgur.com/1MgcQg0.gif'},
// ];

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

export const ReactionPopup = ({style, onChooseReact = () => {}}) => {
  const selectedIndexRef = useRef(-1);

  const iconAnimRef = useRef(reactions.map(() => new Animated.Value(0)));
  const iconPaddingAnimRef = useRef(reactions.map(() => new Animated.Value(0)));
  const containerAnimRef = useRef(new Animated.Value(0));

  const selectReaction = index => {
    let oldIndex = selectedIndexRef.current;
    let newIndex = selectedIndexRef.current !== index ? index : -1;

    // save selected index
    selectedIndexRef.current = newIndex;

    const duration = 1000;

    Animated.parallel(
      [
        // animate icons
        newIndex >= 0
          ? Animated.timing(iconAnimRef.current[newIndex], {
              toValue: 1,
              duration,
              useNativeDriver: false,
            })
          : null,
        oldIndex >= 0
          ? Animated.timing(iconAnimRef.current[oldIndex], {
              toValue: 0,
              duration,
              useNativeDriver: false,
            })
          : null,

        // animate container
        Animated.timing(containerAnimRef.current, {
          toValue: newIndex !== -1 ? 1 : 0,
          duration,
          useNativeDriver: false,
        }),

        // animate padding
        newIndex >= 0
          ? Animated.timing(iconPaddingAnimRef.current[newIndex], {
              toValue: 1,
              duration,
              useNativeDriver: false,
            })
          : null,
        oldIndex >= 0
          ? Animated.timing(iconPaddingAnimRef.current[oldIndex], {
              toValue: 0,
              duration,
              useNativeDriver: false,
            })
          : null,
      ],
      {stopTogether: false},
    ).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              scale: containerAnimRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.9],
              }),
            },
          ],
        },
        style,
      ]}>
      {reactions.map(({name, icon, img}, index) => {
        const scale = iconAnimRef.current[index].interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2],
        });
        const translateY = iconAnimRef.current[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        });
        const paddingHorizontal = iconPaddingAnimRef.current[index].interpolate(
          {
            inputRange: [0, 1],
            outputRange: [0, Spacing.L],
          },
        );

        return (
          <AnimatedButton
            activeOpacity={1}
            key={'reaction' + index}
            onPress={() => {
              selectReaction(index);
            }}
            style={[
              {
                paddingHorizontal,
                transform: [{scale}, {translateY}],
              },
            ]}>
            <Image source={icon ?? {uri: img}} style={styles.icon(index)} />
          </AnimatedButton>
        );
      })}
    </Animated.View>
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
