import React from 'react';
import {View, Text, SafeAreaView, FlatList, ListRenderItem} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Department, Gender} from '../../api/interfaces.ts';
import {getEnumKeys} from '../../../../infrastructure/helpers.ts';
import {celebritiesListService} from '../../home.service.ts';
import { filtersStyles } from "./Filters.styles.ts";

export function Filters() {
  const renderDepartment: ListRenderItem<string> = ({item}) => {
    return (
      <BouncyCheckbox
        textStyle={{
          textDecorationLine: 'none',
        }}
        text={item}
        isChecked={
          item in Department &&
          // @ts-ignore
          celebritiesListService.isInSelectedDepartment(Department[item])
        }
        onPress={() => {
          if (item in Department) {
            celebritiesListService.filterByDepartment(
              // @ts-ignore
              Department[item],
            );
          }
        }}
      />
    );
  };

  const renderGender: ListRenderItem<string> = ({item}) => {
    return (
      <BouncyCheckbox
        textStyle={{
          textDecorationLine: 'none',
        }}
        isChecked={
          item in Gender &&
          // @ts-ignore
          celebritiesListService.isInSelectedGender(Gender[item])
        }
        text={item}
        onPress={() => {
          if (item in Gender) {
            celebritiesListService.filterByGender(
              // @ts-ignore
              Gender[item],
            );
          }
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={filtersStyles.container}>
        <Text style={filtersStyles.header}>Filters</Text>
        <Text style={filtersStyles.subHeader}>Departments</Text>
        <FlatList
          keyExtractor={item => item}
          data={getEnumKeys(Department)}
          renderItem={renderDepartment}
        />
        <Text style={filtersStyles.subHeader}>Gender</Text>
        <FlatList
          keyExtractor={item => item}
          data={getEnumKeys(Gender)}
          renderItem={renderGender}
        />
        <Text style={filtersStyles.subHeader}>Liked/Disliked</Text>
        <BouncyCheckbox
          textStyle={{
            textDecorationLine: 'none',
          }}
          text="Liked"
          onPress={(isChecked: boolean) => {
            celebritiesListService.filterByLikedDisliked({
              liked: isChecked,
            });
          }}
        />
        <BouncyCheckbox
          textStyle={{
            textDecorationLine: 'none',
          }}
          text="Disliked"
          onPress={(isChecked: boolean) => {
            celebritiesListService.filterByLikedDisliked({
              disliked: isChecked,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}
