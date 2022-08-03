import {Platform} from 'react-native';

// https://stackoverflow.com/a/8653372
export function getCloser(a, b) {
  b = b || 15;
  return Math.round(a / b) * b;
}

export const isAndroid = Platform.OS !== 'android';
export const isIOS = Platform.OS !== 'ios';
