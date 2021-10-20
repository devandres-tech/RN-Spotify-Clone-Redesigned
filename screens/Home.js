import React, { useEffect } from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, FONTS, SIZES } from '../constants'
import * as userActions from '../store/actions/user'
import * as playlistActions from '../store/actions/playlist'
import { TextButton, HorizontalCardContainer, Header } from '../components'

const Home = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getProfile())
    dispatch(userActions.getPlaylists(10))
    dispatch(userActions.getRecentlyPlayed(10))
    dispatch(userActions.getTopArtists('long_term', 3))
    dispatch(playlistActions.getCategoryPlaylist('toplists', 10))
  }, [dispatch])

  const renderButtons = () => {
    return (
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
    )
  }

  const renderTopArtistsAndTracksContainer = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          paddingRight: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.lightGray3,
          padding: 10,
          borderRadius: 20,
          paddingBottom: SIZES.paddingBottom,
        }}
      >
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row-reverse',
          }}
        >
          <View
            style={{
              paddingLeft: 45,
              paddingRight: 80,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                paddingBottom: 30,
                ...FONTS.h2,
              }}
            >
              SEE YOUR ALL TIME TOP ARTISTS AND TRACKS
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body }}>
              Your top tracks and artist throughout your listening history
            </Text>
          </View>
          {user.topArtists.reverse().map((artist) => {
            return (
              <View style={{ width: 30 }}>
                <Image
                  style={{
                    height: 135,
                    width: 68,
                    borderRadius: 20,
                  }}
                  source={{ uri: artist.images[0].url }}
                />
              </View>
            )
          })}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: SIZES.paddingTop,
        backgroundColor: COLORS.black,
        width: '100%',
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Header name={user.data.display_name.split(' ')[0]} />
        }
        ListFooterComponent={
          <View style={{ paddingBottom: 120 }}>
            <HorizontalCardContainer
              cardItemTextStyle={{ paddingLeft: 20 }}
              data={user.playlists}
              label='MY PLAYLISTS'
            />
            {renderButtons()}
            <HorizontalCardContainer
              cardItemImageStyle={{ opacity: 1 }}
              cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
              data={user.recentlyPlayed}
              label='RECENTLY PLAYED'
            />
            {renderTopArtistsAndTracksContainer()}
          </View>
        }
      />
    </View>
  )
}

export default Home
