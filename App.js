/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import theme from './App/styles';
import {NativeBaseProvider} from 'native-base';
import {Root} from './App/components/RootComponent';

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Root />
    </NativeBaseProvider>
  );
}

export default App;
