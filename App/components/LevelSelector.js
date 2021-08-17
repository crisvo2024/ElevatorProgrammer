import {
  Actionsheet,
  Box,
  Button,
  Center,
  FlatList,
  SimpleGrid,
  useDisclose,
} from 'native-base';
import React from 'react';

export const LevelSelector = ({levelOptions}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <Box>
      <Button m={4} onPress={onOpen}>
        abrir
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <FlatList
            numColumns={5}
            data={levelOptions}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Actionsheet.Item
                w={'20%'}
                onPress={onClose}
                justifyContent={'center'}>
                {item.value}
              </Actionsheet.Item>
            )}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};
