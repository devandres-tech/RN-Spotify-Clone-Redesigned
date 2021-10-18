import React from 'react'
import { View, Text, Image } from 'react-native'
import {} from 'react-redux'

import { COLORS, FONTS, SIZES, icons } from '../constants'

const Header = ({ name }) => {
  return (
    <View
      style={{
        paddingTop: SIZES.paddingTop,
        paddingBottom: 30,
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{
            tintColor: COLORS.white,
            height: 25,
            width: 25,
            marginRight: SIZES.padding,
          }}
          source={icons.spotifyLogoWhite}
        />
        <Text style={{ color: COLORS.white, ...FONTS.greeting }}>
          GOOD MORNING {name.toUpperCase()}!
        </Text>
      </View>
    </View>
  )
}

export default Header
