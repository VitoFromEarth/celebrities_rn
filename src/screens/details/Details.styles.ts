import {StyleSheet} from 'react-native';

export const CelebrityDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  image: {
    borderRadius: 5,
    flex: 1,
  },
  textData: {
    flex: 1,
    padding: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  hightlight: {
    fontWeight: 'bold',
    color: 'black',
  },
  overviewContainer: {
    paddingHorizontal: 15,
  },
  overviewHeader: {
    paddingVertical: 15,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  text: {
    color: 'black',
  },
});
