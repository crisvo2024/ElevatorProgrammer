import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ConnectedScreen, ConnectionScreen} from '../screens';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  let status = useSelector(state => state.connection.status);
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      {status !== 'connected' ? (
        <Stack.Screen name="Home" component={ConnectionScreen} />
      ) : (
        <Stack.Screen
          name="Programación de niveles"
          component={ConnectedScreen}
        />
      )}
    </Stack.Navigator>
  );
};
