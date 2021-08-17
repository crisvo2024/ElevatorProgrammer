import {Flex, Select, Text} from 'native-base';
import React from 'react';
import {
  selectLevelById,
  selectValueForLevel,
} from '../redux/features/levelsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {flex} from 'styled-system';

export const LevelItem = ({levelOptions, id}) => {
  const dispatch = useDispatch();
  const level = useSelector(state => selectLevelById(state, id));
  return (
    <Flex
      direction={'row'}
      justifyContent={'space-between'}
      alignContent={'center'}
      alignItems={'center'}>
      <Text alignSelf={'center'}>Nivel {id}</Text>
      <Select
        variant={'rounded'}
        width={'50%'}
        defaultValue={level.value}
        _wrapperRef={{
          width: '10%',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          display: 'flex',
          alignSelf: 'center',
        }}
        onValueChange={value => dispatch(selectValueForLevel(id, value))}>
        <Flex direction={'row'} wrap={'wrap'}>
          {levelOptions.map(option => (
            <Select.Item
              label={option.value}
              value={option.id}
              key={option.id}
              width={'20%'}
              justifyContent={'center'}
            />
          ))}
        </Flex>
      </Select>
    </Flex>
  );
};
