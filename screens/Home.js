import React, { useEffect } from 'react'
import { View, Text, Image, FlatList } from 'react-native'

import { COLORS, FONTS, SIZES, icons } from '../constants'
import { useSelector, useDispatch } from 'react-redux'
import * as userActions from '../store/actions/user'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextButton } from '../components'

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
          paddingTop: SIZES.padding,
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
              marginRight: 10,
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

  const renderUserPlaylists = () => {
    return (
      <View style={{ paddingBottom: 20, width: '100%' }}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1,
            paddingBottom: 15,
            paddingHorizontal: 10,
          }}
        >
          MY PLAYLISTS
        </Text>
        <FlatList
          data={user.playlists}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ paddingRight: 10, paddingHorizontal: 10 }}
              >
                <Image
                  source={{ uri: item.images[0].url }}
                  style={{
                    width: 135,
                    height: 135,
                    borderRadius: 15,
                    opacity: 0.6,
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    position: 'absolute',
                    bottom: 10,
                    paddingLeft: 10,
                    ...FONTS.btn,
                  }}
                >
                  {item.name.toUpperCase()}
                </Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: SIZES.padding,
        backgroundColor: COLORS.black,
      }}
    >
      <FlatList
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={
          <View>
            {renderUserPlaylists()}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
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
          </View>
        }
      />
      {/* <View>
          <Text style={{ color: COLORS.white, ...FONTS.h1 }}>MY PLAYLISTS</Text>
          <FlatList />
        </View> */}

      {/* recently played */}
      {/* wrapped  */}
      {/* popular */}
      {/* featured */}
      {/* new releases */}
      {/* </StatusBar> */}
    </View>
  )
}

export default Home
