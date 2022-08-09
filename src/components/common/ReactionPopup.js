import React, {useRef} from 'react';
import {Image, StyleSheet, View, PanResponder, Animated} from 'react-native';
import * as icons from '../../constants/icons';
import {Colors, Spacing} from '../../constants/theme';

// const reactions = [
//   {name: 'like', icon: icons.reaction_like},
//   {name: 'love', icon: icons.reaction_love},
//   {name: 'care', icon: icons.reaction_care},
//   {name: 'haha', icon: icons.reaction_haha},
//   {name: 'wow', icon: icons.reaction_wow},
//   {name: 'sad', icon: icons.reaction_sad},
//   {name: 'angry', icon: icons.reaction_angry},
// ];

// https://www.codedaily.io/tutorials/How-to-make-Facebook-Reactions
// https://medium.com/@duytq94/facebook-reactions-animation-with-react-native-8f750e136ff5
var reactions = [
  {id: 'like', img: 'http://i.imgur.com/LwCYmcM.gif'},
  {id: 'love', img: 'http://i.imgur.com/k5jMsaH.gif'},
  {id: 'haha', img: 'http://i.imgur.com/f93vCxM.gif'},
  {id: 'yay', img: 'http://i.imgur.com/a44ke8c.gif'},
  {id: 'wow', img: 'http://i.imgur.com/9xTkN93.gif'},
  {id: 'sad', img: 'http://i.imgur.com/tFOrN5d.gif'},
  {id: 'angry', img: 'http://i.imgur.com/1MgcQg0.gif'},
];

export const ReactionPopup = ({style, onChooseReact = () => {}}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: true,
      }),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        pan.flattenOffset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return (
    <View style={[styles.container, style]} {...panResponder.panHandlers}>
      {reactions.map(({name, icon, img}, index) => (
        <Animated.View style={{}} key={'reaction' + index}>
          <Image source={icon || {uri: img}} style={styles.icon(index)} />
        </Animated.View>
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
