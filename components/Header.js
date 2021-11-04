import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { SvgXml } from 'react-native-svg'
import HomeSvg from '../assets/icons/ic_home.svg'

import { COLORS, FONTS, SIZES, icons } from '../constants'
import * as userActions from '../store/actions/user'

const Header = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

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
        <SvgXml width='25' height='25' xml={HomeSvg} />
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
