import React from 'react'
import { Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, FONTS, SIZES } from '../constants'

const HorizontalCardItem = ({ imageUrl, label }) => {
  return (
    <TouchableOpacity
      style={{
        paddingRight: SIZES.padding,
        paddingHorizontal: SIZES.padding,
      }}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: 135,
          height: 135,
          borderRadius: 15,
          opacity: 0.6,
        }}
      />
      <Text
        style={{
          color: COLORS.white,
          position: 'absolute',
          bottom: SIZES.padding,
          paddingLeft: 20,
          ...FONTS.btn,
        }}
      >
        {label.toUpperCase()}
      </Text>
    </TouchableOpacity>
  )
}

export default HorizontalCardItem
