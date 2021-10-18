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

  const renderUserPlaylists = () => {
    return (
      <View style={{ paddingBottom: 20, width: '100%' }}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1,
            paddingBottom: 15,
            paddingHorizontal: SIZES.padding,
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
                style={{
                  paddingRight: SIZES.padding,
                  paddingHorizontal: SIZES.padding,
                }}
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
                    paddingLeft: 20,
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

  const renderRecentlyPlayed = () => {
    return (
      <View style={{ paddingBottom: 20, width: '100%' }}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1,
            paddingBottom: 15,
            paddingHorizontal: SIZES.padding,
          }}
        >
          RECENTLY PLAYED
        </Text>
        <FlatList
          data={user.playlists}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  paddingRight: SIZES.padding,
                  paddingHorizontal: SIZES.padding,
                }}
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
                    paddingLeft: 20,
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
        paddingTop: SIZES.paddingTop,
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
                paddingHorizontal: SIZES.padding,
                paddingBottom: 20,
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
            {renderRecentlyPlayed()}
          </View>
        }
      />
    </View>
  )
}

export default Home
