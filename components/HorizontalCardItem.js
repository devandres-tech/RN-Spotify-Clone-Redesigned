import React, { useState } from 'react'
import { Text, Image } from 'react-native'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'

import { COLORS, FONTS, SIZES } from '../constants'

const HorizontalCardItem = ({
  imageUrl,
  cardLabel,
  cardItemImageStyle,
  cardItemTextStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        paddingRight: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        width: 145,
      }}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: 135,
          height: 135,
          borderRadius: 15,
          opacity: 0.6,
          ...cardItemImageStyle,
        }}
      />
      <Text
        style={{
          color: COLORS.white,
          position: 'absolute',
          bottom: SIZES.padding,
          ...FONTS.cardItemText,
          ...cardItemTextStyle,
        }}
      >
        {cardLabel.length > 18
          ? cardLabel.toUpperCase().substr(0, 18) + '...'
          : cardLabel.toUpperCase().trim()}
      </Text>
    </TouchableOpacity>
  )
}

export default HorizontalCardItem
