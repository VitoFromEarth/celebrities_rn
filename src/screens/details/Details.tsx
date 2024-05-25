import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Image, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router/router.types.ts';
import {celebrityDetailsService} from './details.service.ts';
import {Celebrity} from './api/dto.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen = observer((props: Props) => {
  const {userId} = props.route.params;

  const celebrity: Celebrity | undefined = celebrityDetailsService.celebrity;
  useEffect(() => {
    if (userId) {
      celebrityDetailsService.getCelebrityDetailsBy(userId);
    }
  }, [userId]);

  if (celebrityDetailsService.loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!celebrity) {
    return (
      <View>
        <Text>No Data found</Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Image width={150} height={250} source={{uri: celebrity.avatar}} />
        <Text>{celebrity.name}</Text>
        <Text>Known for playing in {celebrity.name}</Text>
        <Text>The movie release data is {celebrity.name}</Text>
      </View>
      <View>
        <Text>Overview</Text>
        <Text></Text>
      </View>
    </View>
  );
});
