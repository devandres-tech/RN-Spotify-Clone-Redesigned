import React from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, FONTS } from '../constants'

const TextButton = ({ label, labelStyle, onPress, buttonContainerStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={{
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 50,
        paddingHorizontal: 40,
        ...buttonContainerStyle,
      }}
    >
      <Text style={{ color: COLORS.white, ...FONTS.btn, ...labelStyle }}>
        {label.toUpperCase()}
      </Text>
    </TouchableOpacity>
  )
}

export default TextButton
