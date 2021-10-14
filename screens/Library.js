import React from 'react'
import { View, Text } from 'react-native'

import { COLORS } from '../constants'

const Library = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.black,
      }}
    >
      <Text>Library </Text>
    </View>
  )
}

export default Library
