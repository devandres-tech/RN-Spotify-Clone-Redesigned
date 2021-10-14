import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS } from '../constants'
import * as userActions from '../store/actions/user'

const Authorize = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    console.log('user data', user.accessToken)
  }, [user])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.black,
      }}
    >
      <Button
        onPress={() => dispatch(userActions.authenticate())}
        title='Login to Spotify'
      />
    </View>
  )
}

export default Authorize
