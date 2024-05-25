import React, {useRef} from 'react';
import {Celebrity} from '../../api/dto.ts';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  FlatList,
} from 'react-native';
import {celebrityListItemStyles} from './CelebrityListItem.styles.ts';
import LikeIcon from '../../../../uikit/icons/LikeIcon.tsx';
import LikeIconFilled from '../../../../uikit/icons/LikeIconFilled.tsx';

interface IProps {
  celebrity: Celebrity;
  onTap: (userId: number) => void;
  onFavouriteTap: (userId: number, like: boolean) => void;
  isFavourite: boolean;
  flatListRef: React.RefObject<FlatList<any>>;
}

const SWIPE_THRESHOLD = 80;

export function CelebrityListItem({
  celebrity,
  isFavourite,
  flatListRef,
  onFavouriteTap,
}: IProps) {
  function toggleFavourite(like: boolean) {
    onFavouriteTap(celebrity.id, like);
    releaseSwipe(0);
  }

  // Actions swipe handler
  const pan = useRef(new Animated.ValueXY()).current;
  const releaseSwipe = (distance: number) => {
    Animated.spring(pan, {
      toValue: {x: distance, y: 0},
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_event, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          const newX =
            SWIPE_THRESHOLD + Math.sqrt(gestureState.dx - SWIPE_THRESHOLD);
          pan.setValue({x: newX, y: 0});
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          const newX =
            -SWIPE_THRESHOLD - Math.sqrt(-SWIPE_THRESHOLD - gestureState.dx);
          pan.setValue({x: newX, y: 0});
        } else {
          pan.setValue({x: gestureState.dx, y: 0});
        }
      },
      onPanResponderRelease: (_event, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD / 2) {
          releaseSwipe(SWIPE_THRESHOLD);
        } else if (gestureState.dx < -SWIPE_THRESHOLD / 2) {
          releaseSwipe(-SWIPE_THRESHOLD);
        } else {
          releaseSwipe(0);
        }
        flatListRef.current?.setNativeProps({scrollEnabled: true});
      },
    }),
  ).current;

  const backgroundColor = pan.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    outputRange: ['#409550', '#000000', '#bB4941'],
    extrapolate: 'clamp',
  });

  return (
    <View>
      <Animated.View
        style={[celebrityListItemStyles.mainContainer, {backgroundColor}]}
      />
      <TouchableOpacity
        disabled={!isFavourite}
        activeOpacity={0.7}
        onPress={() => toggleFavourite(false)}>
        <View
          style={[
            celebrityListItemStyles.iconContainer,
            celebrityListItemStyles.iconContainerLeft,
          ]}>
          <Text>Dislike</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={isFavourite}
        onPress={() => toggleFavourite(true)}>
        <View
          style={[
            celebrityListItemStyles.iconContainer,
            celebrityListItemStyles.iconContainerRight,
          ]}>
          <Text>Like</Text>
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
          celebrityListItemStyles.container,
          celebrityListItemStyles[`gender-${celebrity.gender}`],
          {transform: [{translateX: pan.x}, {translateY: pan.y}]},
        ]}
        {...panResponder.panHandlers}>
        <Image
          style={celebrityListItemStyles.image}
          width={60}
          height={90}
          source={{uri: celebrity.avatar}}
        />
        <View style={celebrityListItemStyles.infoContainer}>
          <Text
            style={[
              celebrityListItemStyles.info,
              celebrityListItemStyles.name,
            ]}>
            {celebrity?.name}
          </Text>
          <Text style={celebrityListItemStyles.info}>
            {celebrity?.department}
          </Text>
        </View>
        <View style={celebrityListItemStyles.likeInfo}>
          {isFavourite ? <LikeIconFilled /> : <LikeIcon fill="red" />}
        </View>
      </Animated.View>
    </View>
  );
}
