import React from 'react'
import { View } from 'react-native'
import CircleSpinner from 'react-native-progress/Circle'

import { COLORS } from '../constants'

const LoadingSpinner = () => {
  return (
    <View
      style={{
        flex: 1,
        height: 400,
      }}
    >
      <CircleSpinner
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        borderWidth={5}
        strokeCap={'round'}
        color={COLORS.primary}
        size={60}
        indeterminate={true}
      />
    </View>
  )
}

export default LoadingSpinner
