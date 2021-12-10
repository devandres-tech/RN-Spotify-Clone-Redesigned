import React from 'react'
import { View } from 'react-native'

import { useAppDispatch } from '../hooks/hooks'
import { COLORS } from '../constants'
import * as authActions from '../store/actions/auth'
import { TextButton } from '../components'

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
        onPress={() => dispatch(authActions.authenticate())}
        label='LOG IN TO SPOTIFY'
      />
    </View>
  )
}

export default Authorize
