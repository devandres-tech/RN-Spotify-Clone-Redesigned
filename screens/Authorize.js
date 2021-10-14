import React from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'

import { COLORS, FONTS } from '../constants'
import * as authActions from '../store/actions/auth'
import { TextButton } from '../components'

const Authorize = ({ navigation }) => {
  const dispatch = useDispatch()

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
