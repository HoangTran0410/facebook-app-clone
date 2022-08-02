import React from 'react';
import {useColorScheme} from 'react-native';
import {MainScreen} from './screens/MainScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return <MainScreen />;
};

export default App;
