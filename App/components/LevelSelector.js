import {
  Actionsheet,
  Box,
  Button,
  Flex,
  ScrollView,
  useDisclose,
} from 'native-base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearLevel, selectValueForLevel} from '../redux/features/levelsReducer';

export const LevelSelector = ({levelOptions}) => {
  const dispatch = useDispatch();
  const selectedLevel = useSelector(state => state.levels.selectedLevel);
  return (
    <Box>
      <Actionsheet
        disableOverlay={true}
        isOpen={selectedLevel !== null}
        onClose={() => dispatch(() => dispatch(clearLevel()))}>
        <Actionsheet.Content>
          <ScrollView>
            <Flex wrap={'wrap'} direction={'row'}>
              {levelOptions.map(item => (
                <Actionsheet.Item
                  w={'20%'}
                  key={item.id}
                  onPress={() => dispatch(selectValueForLevel(item.id))}
                  justifyContent={'center'}
                  {...(selectedLevel && item.id === selectedLevel.value
                    ? {bg: 'cyan.600'}
                    : {})}>
                  {item.value}
                </Actionsheet.Item>
              ))}
            </Flex>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};
