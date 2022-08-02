import React from 'react';
import {useColorScheme} from 'react-native';
import {HomeScreen} from './screens/HomeScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return <HomeScreen />;
};

export default App;
