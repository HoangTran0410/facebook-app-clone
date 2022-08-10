import React from 'react';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MainScreen} from './screens/MainScreen';
import {ReactionPopup} from './components';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <MainScreen />
        <ReactionPopup />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
