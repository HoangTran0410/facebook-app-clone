import React from 'react';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Screens} from './constants/global';

import {MainScreen} from './screens/MainScreen';
import {ReactionPopup} from './components';
import {LoadingScreen} from './screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={Screens.LoadingScreen}>
            <Stack.Screen
              name={Screens.LoadingScreen}
              component={LoadingScreen}
            />
            <Stack.Screen name={Screens.MainScreen} component={MainScreen} />

            {/* Global Stuff */}
            <ReactionPopup />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
