import React from 'react'
import { Text, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SvgXml } from 'react-native-svg'
// svg icons
import HomeSvg from '../assets/icons/ic_home.svg'
import HomeSelectedSvg from '../assets/icons/ic_home_selected.svg'
import SearchSvg from '../assets/icons/ic_search.svg'
import LibrarySvg from '../assets/icons/ic_library.svg'
import LibrarySelectedSvg from '../assets/icons/ic_library_selected.svg'
import ProfileSvg from '../assets/icons/ic_profile.svg'
import ProfileSelectedSvg from '../assets/icons/ic_profile_selected.svg'
import { COLORS, FONTS } from '../constants'

interface ITabBarIcon {
  isFocused: boolean
  name: string
}

const TabBarIcon = ({ isFocused, name }: ITabBarIcon) => {
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
            backgroundColor: isFocused ? COLORS.primary : '',
            borderRadius: 100,
            height: 60,
            width: 60,
          },
          { transform: [{ scale }] },
        ]}
      >
        {name === 'HomeStack' && (
          <SvgXml
            width={'25'}
            height={'25'}
            xml={isFocused ? HomeSelectedSvg : HomeSvg}
          />
        )}
        {name === 'SearchStack' && (
          <SvgXml width='25' height='25' xml={SearchSvg} />
        )}
        {name === 'LibraryStack' && (
          <SvgXml
            width='25'
            height='25'
            xml={isFocused ? LibrarySelectedSvg : LibrarySvg}
          />
        )}
        {name === 'ProfileStack' && (
          <SvgXml
            width='25'
            height='25'
            xml={isFocused ? ProfileSelectedSvg : ProfileSvg}
          />
        )}
        <Text
          style={{
            color: isFocused ? COLORS.white : COLORS.lightGray,
            marginTop: 5,
            ...FONTS.icon,
          }}
        >
          {name === 'HomeStack' && 'HOME'}
          {name === 'SearchStack' && 'SEARCH'}
          {name === 'LibraryStack' && 'Library'}
          {name === 'ProfileStack' && 'Profile'}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default TabBarIcon
