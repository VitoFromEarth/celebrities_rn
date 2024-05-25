import React, {useCallback, useEffect, useRef} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, ListRenderItem, Text, TextInput, View} from 'react-native';
import {observer} from 'mobx-react-lite';

import {
  RootStackParamList,
  DrawerStackParamList,
} from '../../router/router.types.ts';
import {Drawer} from '../../router/router.tsx';
import {Filters} from './components/Filters/Filters.tsx';
import {DrawerToggleButton} from '@react-navigation/drawer';
import {celebritiesListService} from './home.service.ts';
import {CelebrityListItem} from './components/CelebrityListItem/CelebrityListItem.tsx';
import {Celebrity} from './api/dto.ts';
import {homeStyles} from './Home.styles.ts';

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

const HomeComponent = observer(
  ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
    const flatListRef = useRef<FlatList>(null);
    useEffect(() => {
      celebritiesListService.getCelebrities();
    }, []);

    function onItemTap(userId: number) {
      navigation.navigate({
        name: 'Details',
        params: {
          userId,
        },
      });
    }

    function onFavouriteTap(userId: number, like: boolean) {
      celebritiesListService.toggleCelebrityLike(userId, like);
    }

    function onSearch(text: string) {
      celebritiesListService.searchCelebrities(text);
    }

    const renderCelebrityItem: ListRenderItem<Celebrity> = useCallback(
      ({item}) => {
        const isFavourite: boolean =
          !!celebritiesListService.likedCelebritiesIds.find(
            id => id === item.id,
          );
        return (
          <CelebrityListItem
            celebrity={item}
            isFavourite={isFavourite}
            onTap={onItemTap}
            onFavouriteTap={onFavouriteTap}
            flatListRef={flatListRef}
          />
        );
      },
      [celebritiesListService.likedCelebritiesIds.length, onItemTap],
    );

    if (celebritiesListService.loading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <View>
        <View style={homeStyles.inputContainer}>
          <TextInput
            onChangeText={onSearch}
            style={homeStyles.textInput}
            placeholder="Search by actor name"
            placeholderTextColor="black"
          />
        </View>
        <FlatList
          ref={flatListRef}
          contentContainerStyle={homeStyles.listContainer}
          keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
          data={celebritiesListService.filteredCelebrities}
          renderItem={renderCelebrityItem}
        />
      </View>
    );
  },
);
