import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { Header } from '../components'
import { COLORS, SIZES } from '../constants'
import * as userActions from '../store/actions/user'

const Profile = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userActions.getProfile())
    dispatch(userActions.getUserFollows(10))
  }, [dispatch])

  console.log('user----', user)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.black,
        paddingTop: SIZES.paddingTop,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Header />
          </View>
        }
      />
    </View>
  )
}

export default Profile
