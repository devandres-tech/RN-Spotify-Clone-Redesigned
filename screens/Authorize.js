import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, FONTS } from '../constants'
import * as userActions from '../store/actions/user'
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
        onPress={() => dispatch(userActions.authenticate())}
        label='LOG IN TO SPOTIFY'
      />
    </View>
  )
}

export default Authorize
