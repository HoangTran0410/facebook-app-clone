import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

export const BlankScreen = ({name = 'Blank Screen'}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{name}</Text>
    </View>
  );
};
