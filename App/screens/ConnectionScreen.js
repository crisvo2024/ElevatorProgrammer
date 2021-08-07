import React from 'react';
import {Button, CheckIcon, Heading, Select, Stack, Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  scanDevices,
  selectDevice,
  selectDevices,
  stopScan,
} from '../redux/features/connection/connectionReducer';

export const ConnectionScreen = () => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);
  const current = useSelector(state => state.connection.current);
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
        <Select.Item label={'label'} value={'holi'} />
        {devices.map(device => (
          <Select.Item label={device.name} value={device.id} key={device.id} />
        ))}
      </Select>
      <Button onPress={() => dispatch(stopScan())}>Conectar</Button>
      <Text>{'kjn' + current}</Text>
    </Stack>
  );
};
