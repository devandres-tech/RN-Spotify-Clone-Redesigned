import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'

import { COLORS, FONTS, SIZES } from '../constants'
import { useSelector, useDispatch } from 'react-redux'
import * as userActions from '../store/actions/user'

const Home = () => {
  const user = useSelector((state) => state.user.data)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getProfile())
  }, [])

  console.log('Home.auth', auth)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: SIZES.padding,
      }}
    >
      <ScrollView>
        {/* header  */}
        <View style={{ paddingTop: 40 }}>
          <Text style={{ color: COLORS.white, ...FONTS.h1 }}>
            Good morning {user.display_name}
          </Text>
        </View>
        {/* recently played */}
        {/* wrapped  */}
        {/* popular */}
        {/* featured */}
        {/* new releases */}
      </ScrollView>
    </View>
  )
}

export default Home
