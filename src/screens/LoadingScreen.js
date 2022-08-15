import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useInterval} from 'usehooks-ts';
import * as icons from '../constants/icons';
import {Colors, FontWeights, Spacing} from '../constants/theme';

const numberOfDots = 5;

export const LoadingScreen = ({}) => {
  const [loadingPosition, setLoadingPosition] = useState(0);

  useInterval(() => {
    setLoadingPosition((loadingPosition + 1) % numberOfDots);
  }, 250);

  return (
    <View style={styles.container}>
      <Image source={icons.logo} style={styles.logo} />

      <View style={styles.loadingContainer}>
        {new Array(numberOfDots).fill(0).map((_, i) => {
          const isActive = i === loadingPosition;
          return <View key={'loading' + i} style={styles.dot(isActive)} />;
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.grayText}>from</Text>
        <Text style={styles.whiteText}>HoangTran</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.fds_black_alpha_80,
  },
  logo: {tintColor: Colors.fds_white, width: 70, height: 70},
  loadingContainer: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: isActive => ({
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: Spacing.XS,
    backgroundColor: isActive ? Colors.base_blue : Colors.glimmer_spinner_icon,
  }),
  footer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: Spacing.XL * 2,
  },
  grayText: {
    color: Colors.fds_white_alpha_50,
    fontSize: 14,
    fontWeight: FontWeights.regular,
  },
  whiteText: {
    fontSize: 16,
    color: Colors.fds_white,
    fontWeight: FontWeights.bold,
  },
});
