import React from 'react';
import {
  Button,
  CheckIcon,
  Heading,
  Select,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  connectToDevice,
  scanDevices,
  selectDevice,
  selectDevices,
} from '../redux/features/connection/connectionReducer';

export const ConnectionScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);
  const {current, status} = useSelector(state => state.connection);
  if (status === 'connecting') {
    return (
      <center>
        <Spinner />
      </center>
    );
  }
  if (status === 'connected') {
    navigation.push('Connected');
  }
  return (
    <Stack
      justifyContent={'center'}
      direction={'column'}
      height={'100%'}
      space={'sm'}
      alignItems={'center'}>
      <Heading textAlign={'center'}>Conexión</Heading>
      <Button size={'lg'} onPress={() => dispatch(scanDevices())}>
        Buscar dispositivos
      </Button>
      <Select
        selectedValue={current}
        minWidth={300}
        width={'90%'}
        accessibilityLabel="Selecciona el dispositivo"
        placeholder="Selecciona el dispositivo"
        onValueChange={itemValue => dispatch(selectDevice(itemValue))}
        _selectedItem={{
          bg: 'cyan.600',
          endIcon: <CheckIcon size={4} />,
        }}>
        {devices.map(device => (
          <Select.Item
            label={device.name ? device.name : device.id}
            value={device.id}
            key={device.id}
          />
        ))}
      </Select>
      <Button onPress={() => dispatch(connectToDevice(current))}>
        Conectar
      </Button>
      <Text>{'kjn' + current}</Text>
    </Stack>
  );
};
