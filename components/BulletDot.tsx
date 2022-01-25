import React from 'react'
import { Text } from 'react-native'
import { COLORS } from '../constants'

const BulletDot = () => {
  return (
    <Text
      style={{
        color: COLORS.lightGray,
        paddingHorizontal: 4,
        fontSize: 4,
      }}
    >{`\u25CF`}</Text>
  )
}

export default BulletDot
