import React from 'react';
import {
  Button,
  Center,
  CheckIcon,
  Heading,
  Select,
  Spinner,
  Stack,
  Text,
  WarningIcon,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  afterError,
  connectToDevice,
  scanDevices,
  selectDevice,
  selectDevices,
} from '../redux/features/connectionReducer';

export const ConnectionScreen = () => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);
  const {current, status, error} = useSelector(state => state.connection);
  if (status === 'connecting') {
    return (
      <Center h={'100%'}>
        <Spinner />
      </Center>
    );
  }
  if (status === 'error') {
    setTimeout(() => dispatch(afterError()), 2000);
    return (
      <Center h={'100%'}>
        <Stack alignItems={'center'}>
          <WarningIcon m={4} color="red.600" />
          <Text>{error}</Text>
        </Stack>
      </Center>
    );
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
    </Stack>
  );
};
