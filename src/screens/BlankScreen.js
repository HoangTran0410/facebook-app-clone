import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../constants/theme';

export const BlankScreen = ({name = 'Blank Screen'}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: Colors.primary_text}}>{name}</Text>
    </View>
  );
};
