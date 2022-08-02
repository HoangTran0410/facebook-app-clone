import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {CircleIconButton} from '../components';
import {messenger, search} from '../constants/icons';
import {Colors, FontWeights, Spacing} from '../constants/theme';

export const HomeScreen = ({}) => {
  const renderHeader = () => {
    return (
      <View style={styles.header.container}>
        <Text style={styles.header.facebookTitle}>facebook</Text>
        <View style={styles.header.rightContainer}>
          <CircleIconButton icon={search} style={{marginRight: Spacing.L}} />
          <CircleIconButton icon={messenger} badge={4} />
        </View>
      </View>
    );
  };

  const renderTabbar = () => {
    return (
      <View style={styles.tabbar.container}>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTabbar()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    container: {
      padding: Spacing.M,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    facebookTitle: {
      fontSize: 30,
      color: Colors.lightBlue,
      fontWeight: FontWeights.heavy,
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  tabbar: {
    container: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: Colors.grey,
    },
    tab: {
      flex: 1,
      borderBottomWidth: 2,
      borderColor: Colors.white,
      padding: Spacing.L,
    },
    tabActive: {
      backgroundColor: Colors.lightBlue,
    },
  },
});
