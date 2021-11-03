import {  Dimensions} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated'
const { height } = Dimensions.get('window')

export const scrollHandler = (property) =>
  useAnimatedScrollHandler({
    onScroll: (e) => {
      property.value = e.contentOffset.y
    },
  })

export const animateScale = (property) =>
  useAnimatedStyle(() => {
    const scale = interpolate(
      property.value,
      [height * (1 - 1 / (1 + Math.sqrt(5) / 2)), 0],
      [-0.5, 1],
      'clamp'
    )

    return {
      transform: [{ scale: scale }],
    }
  })

export const animateOpacity = (property) =>
  useAnimatedStyle(() => {
    const opacity = interpolate(
      property.value,
      [0, 200, 400, height * (1 - 1 / (1 + Math.sqrt(5) / 2))],
      [0, 0, 0, 1],
      'clamp'
    )
    return {
      opacity: opacity,
    }
  })

export const animateHeight = (property) =>
  useAnimatedStyle(() => {
    const heightAnim = interpolate(
      property.value,
      [0, 200, 400, height * (1 - 1 / (1 + Math.sqrt(5) / 2))],
      [0, 0, 90, 100],
      'clamp'
    )
    return {
      height: heightAnim,
    }
  })
