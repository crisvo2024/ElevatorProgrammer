import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Button, Flex, Heading, ScrollView} from 'native-base';
import {selectEncoding} from '../redux/features/levelsReducer';
import {LevelSelector} from '../components';

export const ConnectedScreen = () => {
  const dispatch = useDispatch();
  const {encodingOptions, encoding, levelOptions, levels} = useSelector(
    state => state.levels,
  );
  return (
    <Box m={2}>
      <Heading size={'md'}>Encodificación</Heading>
      <Flex wrap={'wrap'} direction={'row'} justifyContent={'space-around'}>
        {encodingOptions.map(option => (
          <Button
            onPress={() => dispatch(selectEncoding(option))}
            key={option}
            width={'30%'}
            my={2}
            variant={encoding === option ? 'solid' : 'outline'}>
            {option}
          </Button>
        ))}
      </Flex>
      <Heading size={'md'}>Valores</Heading>
      <ScrollView>
        <Box mx={2}>
          {levels.map(item => (
            <LevelSelector
              key={item.level}
              levelOptions={levelOptions}
              item={item}
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
};
