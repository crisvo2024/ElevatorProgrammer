import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  CheckIcon,
  FlatList,
  Heading,
  ScrollView,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useDisclose,
} from 'native-base';
import {
  getCurrentLevels,
  selectLevelsIds,
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
  if (status === 'loading') {
    dispatch(getCurrentLevels());
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
      <Box flex={1} m={2}>
        <Heading size={'md'}>Decodificación</Heading>
        <EncodingSelector />
        <Heading size={'md'}>Valores</Heading>
        <FlatList
          m={2}
          data={levels}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <LevelItem levelOptions={levelOptions} id={item} />
          )}
        />
      </Box>
      <Button m={4} onPress={() => dispatch(sendLevels())}>
        Guardar
      </Button>
      <LevelSelector levelOptions={levelOptions} />
    </Box>
  );
};
