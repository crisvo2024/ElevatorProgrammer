import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ConnectionScreen} from '../screens';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ConnectionScreen} />
    </Stack.Navigator>
  );
};
