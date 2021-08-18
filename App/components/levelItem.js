import {
  CheckIcon,
  ChevronDownIcon,
  Flex,
  Input,
  Pressable,
  Select,
  Text,
} from 'native-base';
import React from 'react';
import {
  selectLevelById,
  selectValueForLevel,
  selectLevel,
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
      <Pressable onPress={() => dispatch(selectLevel(level))}>
        <Input
          pointerEvents="none"
          aria-hidden={true}
          variant={'rounded'}
          textAlign={'center'}
          width={20}
          pl={4}
          pr={0}
          editable={false}
          focusable={false}
          InputRightElement={<ChevronDownIcon size={5} mr={2} />}>
          {levelOptions[level.value].value}
        </Input>
      </Pressable>
      {/*<Select*/}
      {/*  variant={'rounded'}*/}
      {/*  width={'20%'}*/}
      {/*  defaultValue={level.value}*/}
      {/*  _selectedItem={{*/}
      {/*    bg: 'cyan.600',*/}
      {/*    // endIcon: <CheckIcon size={4} />,*/}
      {/*  }}*/}
      {/*  _actionSheetContent={{flexDirection: 'column', flexWrap: 'wrap'}}*/}
      {/*  onValueChange={value => dispatch(selectValueForLevel(id, value))}>*/}
      {/*  /!*<Flex direction={'row'} wrap={'wrap'}>*!/*/}
      {/*  {levelOptions.map(option => (*/}
      {/*    <Select.Item*/}
      {/*      label={option.value}*/}
      {/*      value={option.id}*/}
      {/*      key={option.id}*/}
      {/*      width={'20%'}*/}
      {/*      justifyContent={'center'}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*  /!*</Flex>*!/*/}
      {/*</Select>*/}
    </Flex>
  );
};
