import {Alert, Linking, Platform, ToastAndroid} from 'react-native';

// https://stackoverflow.com/a/8653372
export function getCloser(a, b) {
  b = b || 15;
  return Math.round(a / b) * b;
}

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const randomImage = (width = 100, height = 100, seed = Math.random()) =>
  `https://picsum.photos/seed/${seed}/${width}/${height}`;

export const randomAvatar = (size = 50, id = randomBetween(1, 70)) =>
  `https://i.pravatar.cc/${size}?img=${id}`;

export const randomBetween = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const toast = text =>
  isIOS ? Alert.alert(text) : ToastAndroid.show(text, ToastAndroid.SHORT);

export const openApp = url => {
  Linking.openURL(url).catch(reason => {
    toast(`Cannot open url ${url}. ${reason}`);
  });
};

export const openAppWithAppID = appID => {
  if (isAndroid) {
    return Linking.openURL(`market://details?id=${appID}`);
  }
  return Linking.openURL(`https://itunes.apple.com/us/app/${appID}`);
};

export const NumberFormat = {
  // https://stackoverflow.com/a/2901298
  thousand: (num = 0) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
};
