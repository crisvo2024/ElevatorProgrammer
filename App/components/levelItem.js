import {
  Box,
  ChevronDownIcon,
  Flex,
  Heading,
  Input,
  Pressable,
  Stack,
  View,
} from 'native-base';
import React from 'react';
import {selectLevelById, selectLevel} from '../redux/features/levelsReducer';
import {useDispatch, useSelector} from 'react-redux';

export const LevelItem = ({levelOptions, id}) => {
  const dispatch = useDispatch();
  const level = useSelector(state => selectLevelById(state, id));
  return (
    <Box bg="white" shadow={2} rounded="lg" width="100%" alignSelf={'center'}>
      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignContent={'center'}
        alignItems={'center'}>
        <Stack space={4} p={4}>
          <Heading size={'md'} noOfLines={2} alignSelf={'center'}>
            Nivel {id}
          </Heading>
        </Stack>
        <Pressable onPress={() => dispatch(selectLevel(level))}>
          <View pointerEvents="none">
            <Input
              aria-hidden={true}
              variant={'unstyled'}
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
    </Box>
  );
};
