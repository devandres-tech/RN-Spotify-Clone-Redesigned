import React from 'react'
import { Text } from 'react-native'

import { COLORS, FONTS, SIZES } from '../constants'

const TextTitle = ({ label, containerStyle }) => {
  return (
    <Text
      style={{
        color: COLORS.white,
        paddingBottom: 15,
        paddingHorizontal: SIZES.padding,
        ...FONTS.h2,
        ...containerStyle,
      }}
    >
      {label}
    </Text>
  )
}

export default TextTitle
