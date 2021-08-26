import {Button, Flex} from 'native-base';
import {selectEncoding} from '../redux/features/levelsReducer';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const EncodingSelector = () => {
  const dispatch = useDispatch();
  const encoding = useSelector(state => state.levels.encoding);
  const encodingOptions = useSelector(state => state.levels.encodingOptions);
  return (
    <Flex wrap={'wrap'} direction={'row'} justifyContent={'space-between'}>
      {encodingOptions.map((value, index) => (
        <Button
          onPress={() => dispatch(selectEncoding(index))}
          key={index}
          width={'30%'}
          my={2}
          variant={encoding === index ? 'solid' : 'outline'}>
          {value}
        </Button>
      ))}
    </Flex>
  );
};
