import React from 'react'
import { Text } from 'react-native'

import { COLORS, FONTS, SIZES } from '../constants'

const TextTitle = ({ label }) => {
  return (
    <Text
      style={{
        color: COLORS.white,
        ...FONTS.h1,
        paddingBottom: 15,
        paddingHorizontal: SIZES.padding,
      }}
    >
      {label}
    </Text>
  )
}

export default TextTitle
