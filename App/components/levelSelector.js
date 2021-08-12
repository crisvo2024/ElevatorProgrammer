import {Flex, Select, Text} from 'native-base';
import React from 'react';
import {selectValueForLevel} from '../redux/features/levelsReducer';
import {useDispatch} from 'react-redux';

export const LevelSelector = ({levelOptions, item}) => {
  const dispatch = useDispatch();
  return (
    <Flex
      direction={'row'}
      justifyContent={'space-between'}
      alignContent={'center'}
      alignItems={'center'}>
      <Text alignSelf={'center'}>Nivel {item.level}</Text>
      <Select
        variant={'rounded'}
        width={'30%'}
        onValueChange={value =>
          dispatch(selectValueForLevel(item.level, value))
        }
        selectedValue={item.value}>
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
