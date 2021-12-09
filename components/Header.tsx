import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import * as userActions from '../store/actions/user'

const Header = () => {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(userActions.getProfile())
  }, [dispatch])

  return (
    <View
      style={{
        paddingTop: SIZES.paddingTop,
        paddingBottom: 30,
        paddingHorizontal: SIZES.padding,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{
            tintColor: COLORS.white,
            height: 25,
            width: 25,
            marginRight: SIZES.padding,
          }}
          source={icons.spotifyLogoWhite}
        />
        <Text style={{ color: COLORS.white, ...FONTS.greeting }}>
          GOOD MORNING {user.data.display_name.split(' ')[0].toUpperCase()}!
        </Text>
      </View>
    </View>
  )
}

export default Header
