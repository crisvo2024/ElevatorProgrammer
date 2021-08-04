/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import theme from './App/styles';
import {store} from './App/redux/store';
import {NativeBaseProvider} from 'native-base';
import {Navigator} from './App/navigation/Navigators';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}

export default App;
