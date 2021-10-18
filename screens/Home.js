import React, { useEffect } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, FONTS, SIZES, icons } from '../constants'
import * as userActions from '../store/actions/user'
import { TextButton, HorizontalCardContainer } from '../components'

const Home = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getProfile())
    dispatch(userActions.getPlaylists(10))
    dispatch(userActions.getRecentlyPlayed(10))
  }, [dispatch])

  const renderHeader = () => {
    return (
      <View
        style={{
          paddingTop: SIZES.paddingTop,
          paddingBottom: 30,
          paddingHorizontal: 10,
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
            GOOD MORNING {user.data.display_name.toUpperCase()}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: SIZES.paddingTop,
        backgroundColor: COLORS.black,
      }}
    >
      <FlatList
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={
          <View>
            <HorizontalCardContainer
              data={user.playlists}
              label='MY PLAYLISTS'
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES.padding,
                paddingBottom: SIZES.paddingBottom,
              }}
            >
              <TextButton
                label='explore'
                buttonContainerStyle={{ paddingHorizontal: 26 }}
              />
              <TextButton
                label='upgrade to premium'
                buttonContainerStyle={{
                  paddingHorizontal: 26,
                  backgroundColor: COLORS.black,
                  borderColor: COLORS.white,
                  borderWidth: 1,
                }}
              />
            </View>

            <HorizontalCardContainer
              data={user.recentlyPlayed}
              label='RECENTLY PLAYED'
            />
          </View>
        }
      />
    </View>
  )
}

export default Home
