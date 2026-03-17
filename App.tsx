import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { BottomTabRoute } from './src/route/BottomTab';
import { NavigationContainer } from '@react-navigation/native';

enableScreens();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <BottomTabRoute />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
