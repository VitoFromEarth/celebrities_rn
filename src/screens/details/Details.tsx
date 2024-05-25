import React from 'react';
import {Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router/router.types.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function DetailsScreen(props: Props) {
  props.navigation.getId();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}
