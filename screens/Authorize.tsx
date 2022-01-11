import React from 'react'
import { View } from 'react-native'

import { useAppDispatch } from '../hooks/redux-hooks'
import { COLORS } from '../constants'
import { TextButton } from '../components'
import { authenticateUserAsync } from '../store/slices/authSlice'

const Authorize = () => {
  const dispatch = useAppDispatch()

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.black,
      }}
    >
      <TextButton
        onPress={() => dispatch(authenticateUserAsync())}
        label='LOG IN TO SPOTIFY'
      />
    </View>
  )
}

export default Authorize
