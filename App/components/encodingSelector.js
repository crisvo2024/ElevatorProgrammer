import {Button, Flex} from 'native-base';
import {selectEncoding} from '../redux/features/levelsReducer';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const EncodingSelector = () => {
  const dispatch = useDispatch();
  const encoding = useSelector(state => state.levels.encoding);
  const encodingOptions = useSelector(state => state.levels.encodingOptions);
  return (
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
  );
};
