import Carousel from 'react-native-reanimated-carousel';
import {Dimensions, Image, Text, View} from 'react-native';
import React from 'react';
import {Movie} from '../api/dto.ts';
import {MoviesCarouselStyles} from './MoviesCarousel.styles.ts';

interface IProps {
  movies: Movie[];
  onMovieChange: (index: number) => void;
}

export function MoviesCarousel({movies, onMovieChange}: IProps) {
  const width = Dimensions.get('window').width;

  return (
    <View>
      <Carousel
        loop
        width={width}
        height={width / 2}
        data={movies}
        scrollAnimationDuration={1000}
        onSnapToItem={onMovieChange}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({item, index}) => (
          <View
            key={index}
            style={[
              MoviesCarouselStyles.container,
              {...(!item.cover ? MoviesCarouselStyles.noImage : {})},
            ]}>
            {item.cover ? (
              <Image
                style={MoviesCarouselStyles.image}
                source={{uri: item.cover}}
              />
            ) : (
              <Text style={{textAlign: 'center', fontSize: 30}}>
                No Image :(
              </Text>
            )}
          </View>
        )}
        vertical={false}
      />
    </View>
  );
}
