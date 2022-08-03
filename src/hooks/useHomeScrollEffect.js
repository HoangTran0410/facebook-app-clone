import {useRef} from 'react';
import {Animated} from 'react-native';
import {getCloser} from '../helpers/utils';

export const useHomeScrollEffect = () => {
  const headerHeightRef = useRef(0);
  const homeFlatlistRef = useRef(null);
  const homeScrollY = useRef(new Animated.Value(0)).current;
  const homeScrollYNumber = useRef(0);
  homeScrollY.addListener(({value}) => {
    homeScrollYNumber.current = value;
  });
  const homeScrollYClamped = Animated.diffClamp(
    homeScrollY,
    0,
    headerHeightRef.current,
  );
  const homeScrollTranslateY = homeScrollYClamped.interpolate({
    inputRange: [0, headerHeightRef.current],
    outputRange: [headerHeightRef.current, 0],
  });
  const homeScrollTranslateYNumber = useRef(0);
  homeScrollTranslateY.addListener(({value}) => {
    homeScrollTranslateYNumber.current = value;
  });

  const onScrollHome = Animated.event(
    [{nativeEvent: {contentOffset: {y: homeScrollY}}}],
    {useNativeDriver: true},
  );

  // https://medium.com/swlh/making-a-collapsible-sticky-header-animations-with-react-native-6ad7763875c3
  const handleSnap = ({nativeEvent}) => {
    const offsetY = nativeEvent.contentOffset.y;
    const y = homeScrollTranslateYNumber.current;
    const h = headerHeightRef.current;

    if (!(y === 0 || y === h) && homeFlatlistRef.current) {
      homeFlatlistRef.current.scrollToOffset({
        offset: getCloser(y, h, 0) === h ? offsetY - (h - y) : offsetY + y,
      });
    }
  };

  const setOpenTopbar = isOpen => {
    if (homeFlatlistRef.current) {
      homeFlatlistRef.current.scrollToOffset({
        animated: true,
        offset:
          homeScrollYNumber.current +
          (isOpen ? -1 : 1) * headerHeightRef.current,
      });
    }
  };

  return {
    setOpenTopbar,
    onScrollHome,
    handleSnap,
    headerHeightRef,
    homeFlatlistRef,
    homeScrollY,
    homeScrollYNumber,
    homeScrollTranslateY,
    homeScrollTranslateYNumber,
  };
};
