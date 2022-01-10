import { Dimensions } from 'react-native'
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
const { height } = Dimensions.get('window')

const DERIVED_HEIGHT = height * (1 - 1 / (1 + Math.sqrt(5) / 2))

export const animateScale = (property: Animated.SharedValue<number>) =>
  useAnimatedStyle(() => {
    const scale = interpolate(
      property.value,
      [DERIVED_HEIGHT, 0],
      [-0.5, 1],
      Extrapolate.CLAMP
    )

    return {
      transform: [{ scale: scale }],
    }
  })

export const animateOpacity = (property: Animated.SharedValue<number>) =>
  useAnimatedStyle(() => {
    const opacity = interpolate(
      property.value,
      [0, 200, 400, DERIVED_HEIGHT],
      [0, 0, 0, 1],
      Extrapolate.CLAMP
    )
    return {
      opacity: opacity,
    }
  })

export const animateHeight = (property: Animated.SharedValue<number>) =>
  useAnimatedStyle(() => {
    const heightAnim = interpolate(
      property.value,
      [0, 200, 400, DERIVED_HEIGHT],
      [0, 0, 90, 100],
      Extrapolate.CLAMP
    )
    return {
      height: heightAnim,
    }
  })

// Only available on IOS
export const verticalAnimation: any = {
  gestureDirection: 'vertical',
  presentation: 'modal',
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    }
  },
}
