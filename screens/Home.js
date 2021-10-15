import React, { useEffect } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'

import { COLORS, FONTS, SIZES, icons } from '../constants'
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
          <View>
            <Image
              style={{
                tintColor: '#fff',
                height: 25,
                width: 25,
              }}
              source={icons.spotifyLogoWhite}
            />
            <Text style={{ color: COLORS.white, ...FONTS.greeting }}>
              GOOD MORNING {user.display_name.toUpperCase()}
            </Text>
          </View>
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
