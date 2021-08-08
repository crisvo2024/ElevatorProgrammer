import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ConnectedScreen, ConnectionScreen} from '../screens';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ConnectionScreen} />
      <Stack.Screen name="Connected" component={ConnectedScreen} />
    </Stack.Navigator>
  );
};
