import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  FlatList,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import {
  getCurrentLevels,
  selectLevelsIds,
  sendAutotest,
  sendLevels,
  toInitial,
} from '../redux/features/levelsReducer';
import {LevelItem} from '../components';
import {EncodingSelector} from '../components/encodingSelector';
import {disconnect} from '../redux/features/connectionReducer';
import {LevelSelector} from '../components/LevelSelector';

export const ConnectedScreen = ({navigation}) => {
  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            dispatch(disconnect());
            dispatch(toInitial());
          }}
          size={'xs'}>
          Desconectar
        </Button>
      ),
    });
  }, [navigation, dispatch]);
  const status = useSelector(state => state.levels.status);
  const levelOptions = useSelector(state => state.levels.levelOptions);
  const levels = useSelector(selectLevelsIds);
  if (status === 'initial') {
    dispatch(getCurrentLevels());
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }
  if (status === 'loading') {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }
  if (status === 'sent') {
    setTimeout(() => dispatch(toInitial()), 1000);
    return (
      <Center flex={1}>
        <Stack alignItems={'center'}>
          <CheckIcon m={4} />
          <Text>Enviado Correctamente</Text>
        </Stack>
      </Center>
    );
  }
  return (
    <Box flex={1}>
      <Box flex={1} my={2} mx={4}>
        <Heading size={'md'}>Decodificación</Heading>
        <EncodingSelector />
        <Heading size={'md'}>Valores</Heading>
        <FlatList
          my={2}
          data={levels}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <LevelItem levelOptions={levelOptions} id={item} />
          )}
        />
      </Box>
      <HStack>
        <Button flex={1} mb={4} mx={4} onPress={() => dispatch(sendAutotest())}>
          Autotest
        </Button>
        <Button flex={1} mb={4} mx={4} onPress={() => dispatch(sendLevels())}>
          Guardar
        </Button>
      </HStack>
      <LevelSelector levelOptions={levelOptions} />
    </Box>
  );
};
