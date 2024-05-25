import {StyleSheet} from 'react-native';
import {Gender} from '../../../../enums.ts';

export const celebrityListItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgrey',
  },
  containerInner: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  infoContainer: {
    paddingVertical: 10,
    flex: 2,
  },
  info: {
    fontSize: 16,
    color: 'black',
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    borderRadius: 5,
  },
  [`gender-${Gender.Male}`]: {
    backgroundColor: 'lightblue',
  },
  [`gender-${Gender.Female}`]: {
    backgroundColor: 'lightpink',
  },
  [`gender-${Gender.NonBinary}`]: {
    backgroundColor: 'lavender',
  },
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 80,
    height: 100,
  },
  iconContainerLeft: {
    left: 0,
  },
  iconContainerRight: {
    right: 0,
  },
  likeInfo: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    flex: 1,
  },
});
