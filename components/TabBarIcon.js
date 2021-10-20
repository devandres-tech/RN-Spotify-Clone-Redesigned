import React from 'react'
import { Text, Image, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, FONTS } from '../constants'

const TabBarIcon = ({ focused, name, source }) => {
  const animation = new Animated.Value(0)
  const inputRange = [0, 1]
  const outputRange = [0.9, 0.7]
  const scale = animation.interpolate({ inputRange, outputRange })

  const onPressIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start()
  }
  const onPressOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500,
    }).start()
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: focused ? COLORS.primary : '',
            borderRadius: 100,
            height: 60,
            width: 60,
          },
          { transform: [{ scale }] },
        ]}
      >
        <Image
          style={{
            tintColor: focused ? COLORS.white : COLORS.lightGray,
            height: 28,
            width: 28,
          }}
          source={source}
        />
        <Text
          style={{
            color: focused ? COLORS.white : COLORS.lightGray,
            fontSize: 10,
            ...FONTS.icon,
          }}
        >
          {name.toUpperCase()}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default TabBarIcon
