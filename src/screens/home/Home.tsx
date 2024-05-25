import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, Text, View} from 'react-native';
import {
  RootStackParamList,
  DrawerStackParamList,
} from '../../router/router.types.ts';
import {Drawer} from '../../router/router.tsx';
import {Filters} from './components/filters/Filters.tsx';
import {DrawerToggleButton} from '@react-navigation/drawer';

export function HomeScreen({}: NativeStackScreenProps<DrawerStackParamList>) {
  return (
    <Drawer.Navigator
      drawerContent={Filters}
      screenOptions={{
        drawerPosition: 'right',
        headerRight: DrawerToggleButton,
        headerLeft: () => null,
      }}>
      <Drawer.Screen
        name="List"
        component={HomeComponent}
        options={{title: 'Celebrities List'}}
      />
    </Drawer.Navigator>
  );
}

function HomeComponent({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate({
            name: 'Details',
            params: {
              userId: 'asd',
            },
          })
        }
      />
    </View>
  );
}
