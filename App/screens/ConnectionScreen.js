import React from 'react';
import {Button, CheckIcon, Heading, Select, Stack} from 'native-base';

export const ConnectionScreen = () => {
  let [language, setLanguage] = React.useState('');
  let devices = [
    {name: 'Santiago1', Mac: 'E9-04-67-9F-92-50'},
    {name: 'Santiago2', Mac: 'E9-04-67-9F-92-51'},
    {name: 'Santiago3', Mac: 'E9-04-67-9F-92-52'},
  ];
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
        selectedValue={language}
        minWidth={300}
        width={'90%'}
        accessibilityLabel="Selecciona el dispositivo"
        placeholder="Selecciona el dispositivo"
        onValueChange={itemValue => setLanguage(itemValue)}
        _selectedItem={{
          bg: 'cyan.600',
          endIcon: <CheckIcon size={4} />,
        }}>
        {devices.map(device => (
          <Select.Item label={device.name} value={device.Mac} />
        ))}
        {/*<Select.Item label="JavaScript" value="js" />*/}
        {/*<Select.Item label="TypeScript" value="ts" />*/}
        {/*<Select.Item label="C" value="c" />*/}
        {/*<Select.Item label="Python" value="py" />*/}
        {/*<Select.Item label="Java" value="java" />*/}
      </Select>
      <Button>Conectar</Button>
    </Stack>
  );
};
