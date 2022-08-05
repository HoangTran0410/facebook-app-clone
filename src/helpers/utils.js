import {Platform} from 'react-native';

// https://stackoverflow.com/a/8653372
export function getCloser(a, b) {
  b = b || 15;
  return Math.round(a / b) * b;
}

export const isAndroid = Platform.OS !== 'android';
export const isIOS = Platform.OS !== 'ios';

export const randomImage = (width = 100, height = 100, seed = Math.random()) =>
  `https://picsum.photos/seed/${seed}/${width}/${height}`;

export const randomAvatar = (size = 50, id = randomBetween(1, 70)) =>
  `https://i.pravatar.cc/${size}?img=${id}`;

export const randomBetween = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
