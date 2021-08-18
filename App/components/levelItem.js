import {ChevronDownIcon, Flex, Input, Pressable, Text, View} from 'native-base';
import React from 'react';
import {selectLevelById, selectLevel} from '../redux/features/levelsReducer';
import {useDispatch, useSelector} from 'react-redux';

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
        <View pointerEvents="none">
          <Input
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
        </View>
      </Pressable>
    </Flex>
  );
};
