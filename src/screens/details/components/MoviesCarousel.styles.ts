import {StyleSheet} from 'react-native';

export const MoviesCarouselStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    borderRadius: 5,
    height: '100%',
    width: '100%',
  },
  noImage: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
  },
  noImageText: {textAlign: 'center', fontSize: 30, color: 'black'},
});
