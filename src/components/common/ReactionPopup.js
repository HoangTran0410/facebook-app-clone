import React, {useRef} from 'react';
import {
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {reactions} from '../../constants/global';
import {Colors, Spacing} from '../../constants/theme';
import {useStore} from '../../store/store';
import {uiSelectors} from '../../store/uiSlice';

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

export const ReactionPopup = ({style, onChooseReact = () => {}}) => {
  const reactionPopupPosition = useStore(uiSelectors.reactionPopupPosition);
  const setReactionPopupPosition = useStore(
    uiSelectors.setReactionPopupPosition,
  );

  const selectedIndexRef = useRef(-1);
  const iconLayoutRef = useRef([]);
  const iconAnimRef = useRef(reactions.map(() => new Animated.Value(0)));
  const containerAnimRef = useRef(new Animated.Value(0));

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderTerminate: (evt, gestureState) => {},
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => false,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderGrant: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        console.log('abc');

        // get current position
        const {moveX, moveY} = gestureState;
        // detect which icon is hovering
        const index = iconLayoutRef.current.findIndex(
          ({x, y, width, height}) =>
            moveX > x && moveX < x + width && moveY > y && moveY < y + height,
        );
        console.log(moveX, moveY, iconLayoutRef.current);
        // select that icon
        selectReaction(index);
      },
      onPanResponderRelease: (evt, gestureState) => {
        selectReaction(-1);
      },
    }),
  ).current;

  const selectReaction = index => {
    let oldIndex = selectedIndexRef.current;
    let newIndex = selectedIndexRef.current !== index ? index : -1;

    // save selected index
    selectedIndexRef.current = newIndex;

    const duration = 150;

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
          toValue: newIndex >= 0 ? 1 : 0,
          duration,
          useNativeDriver: false,
        }),
      ],
      {stopTogether: false},
    ).start();
  };

  const renderReaction = () =>
    reactions.map(({name, icon, img}, index) => {
      const ref = iconAnimRef.current[index];
      const scale = ref.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
      });
      const translateY = ref.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
      });
      const paddingHorizontal = ref.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Spacing.XL],
      });

      return (
        <Animated.View
          key={'reaction' + index}
          pointerEvents="none"
          onLayout={event => {
            iconLayoutRef.current[index] = event.nativeEvent.layout;
          }}
          style={[{paddingHorizontal, transform: [{scale}, {translateY}]}]}>
          <Image source={icon ?? {uri: img}} style={styles.icon(index)} />
        </Animated.View>
      );
    });

  if (!reactionPopupPosition) return null;

  return (
    <TouchableWithoutFeedback onPress={() => setReactionPopupPosition(null)}>
      <View style={{...StyleSheet.absoluteFill}}>
        <View style={styles.outer(reactionPopupPosition)}>
          <Animated.View
            {...panResponder.panHandlers}
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
            {renderReaction()}
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  outer: position => ({
    position: 'absolute',
    top: position?.y,
    left: position?.x,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  container: {
    flexDirection: 'row',
    padding: Spacing.S,
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
    marginLeft: index === 0 ? 0 : Spacing.S,
  }),
});
