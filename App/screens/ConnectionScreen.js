import React from 'react';
import {Button, CheckIcon, Heading, Select, Stack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {selectDevice} from '../redux/features/connection/connectionReducer';

export const ConnectionScreen = () => {
  const dispatch = useDispatch();
  const {devices, current} = useSelector(state => state.connection);
  return (
    <Stack
      justifyContent={'center'}
      direction={'column'}
      height={'100%'}
      space={'sm'}
      alignItems={'center'}>
      <Heading textAlign={'center'}>Conexión</Heading>
      <Button size={'lg'}>Buscar dispositivos</Button>
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
            label={device.name}
            value={device.Mac}
            key={device.Mac}
          />
        ))}
      </Select>
      <Button>Conectar</Button>
    </Stack>
  );
};
