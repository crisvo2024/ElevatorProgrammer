import {Flex, Select, Text} from 'native-base';
import React from 'react';
import {
  selectLevelById,
  selectValueForLevel,
} from '../redux/features/levelsReducer';
import {useDispatch, useSelector} from 'react-redux';

export const LevelSelector = ({levelOptions, id}) => {
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
        width={'30%'}
        onValueChange={value => dispatch(selectValueForLevel(id, value))}
        selectedValue={level.value}>
        {levelOptions.map(option => (
          <Select.Item
            label={option.value}
            value={option.id}
            key={option.id}
            alignContent={'center'}
          />
        ))}
      </Select>
    </Flex>
  );
};
