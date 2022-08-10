import React, {useRef} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
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

const AnimatedButton = Animated.createAnimatedComponent(
  TouchableWithoutFeedback,
);

export const ReactionPopup = ({style, onChooseReact = () => {}}) => {
  const selectedIndexRef = useRef(-1);
  const animsRef = useRef(reactions.map(() => new Animated.Value(0)));
  const containerAnimRef = useRef(new Animated.Value(0));

  const hoverReaction = index => {
    const preSelect = selectedIndexRef.current;
    selectedIndexRef.current = index;

    const anims = reactions.map((_, i) => {
      const scaleValue = i === index ? 1 : 0;
      return Animated.timing(animsRef.current[i], {
        toValue: scaleValue,
        duration: 100,
        useNativeDriver: true,
      });
    });

    if (preSelect === -1) {
      anims.push(
        Animated.timing(containerAnimRef.current, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      );
    }

    Animated.parallel(anims, {
      stopTogether: false,
    }).start();
  };

  const containerScale = containerAnimRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  return (
    <Animated.View
      style={[styles.container, {transform: [{scale: containerScale}]}, style]}>
      {reactions.map(({name, icon, img}, index) => {
        const anim = animsRef.current[index];
        const scale = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2],
        });
        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        });

        return (
          <AnimatedButton
            activeOpacity={1}
            key={'reaction' + index}
            onPressIn={() => {
              hoverReaction(index);
            }}
            style={{
              transform: [{scale}, {translateY}],
            }}>
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
