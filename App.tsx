import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import { FormLogin } from './src/page/FormLogin/FormLogin';

/* import { FormUser } from './src/page/FormUser/FormUser'; */

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <FormUser /> */}
      <FormLogin />
    </SafeAreaProvider>
  );
}

export default App;
