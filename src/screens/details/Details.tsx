import React, {useEffect} from 'react';

import {observer} from 'mobx-react-lite';
import {Image, ScrollView, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router/router.types.ts';
import {celebrityDetailsService} from './details.service.ts';
import {Celebrity, Movie} from './api/dto.ts';
import {MoviesCarousel} from './components/MoviesCarousel.tsx';
import {formatDate} from '../../infrastructure/helpers.ts';
import {CelebrityDetailsStyles} from './Details.styles.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen = observer((props: Props) => {
  const [activeMovie, setActiveMovie] = React.useState<Movie | undefined>(
    undefined,
  );
  const {userId} = props.route.params;

  const celebrity: Celebrity | undefined = celebrityDetailsService.celebrity;
  useEffect(() => {
    if (userId) {
      celebrityDetailsService.getCelebrityDetailsBy(userId);
    }
  }, [userId]);

  useEffect(() => {
    setActiveMovie(celebrity?.movies[0]);
  }, [celebrity?.movies]);

  function onMovieChanged(movieIndex: number) {
    setActiveMovie(celebrity?.movies[movieIndex]);
  }

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
    <ScrollView style={{flexDirection: 'column'}}>
      <MoviesCarousel
        onMovieChange={onMovieChanged}
        movies={celebrity.movies}
      />
      <View style={CelebrityDetailsStyles.container}>
        <Image
          style={CelebrityDetailsStyles.image}
          width={150}
          height={250}
          source={{uri: celebrity.avatar}}
        />
        <View style={CelebrityDetailsStyles.textData}>
          <Text style={CelebrityDetailsStyles.name}>{celebrity.name}</Text>
          <Text style={CelebrityDetailsStyles.text}>Known for playing in</Text><Text style={CelebrityDetailsStyles.hightlight}>{activeMovie?.title}</Text>
          <Text style={CelebrityDetailsStyles.text}>
            The movie release data is
          </Text>
          <Text style={CelebrityDetailsStyles.hightlight}>{formatDate(activeMovie?.releaseDate)}</Text>
        </View>
      </View>
      <View style={CelebrityDetailsStyles.overviewContainer}>
        <Text style={CelebrityDetailsStyles.overviewHeader}>Overview</Text>
        <Text style={CelebrityDetailsStyles.text}>{activeMovie?.overview}</Text>
      </View>
    </ScrollView>
  );
});
