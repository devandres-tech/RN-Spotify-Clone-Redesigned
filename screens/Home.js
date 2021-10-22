import React, { useEffect } from 'react'
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, FONTS, SIZES } from '../constants'
import * as userActions from '../store/actions/user'
import * as playlistActions from '../store/actions/playlist'
import {
  TextButton,
  HorizontalCardContainer,
  Header,
  TextTitle,
} from '../components'

const Home = () => {
  const user = useSelector((state) => state.user)
  const playlist = useSelector((state) => state.playlist)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getPlaylists(10))
    dispatch(userActions.getRecentlyPlayed(10))
    dispatch(userActions.getTopArtists('long_term', 3))
    dispatch(playlistActions.getFeaturedPlaylists(1))
    dispatch(playlistActions.getCategoryPlaylist('toplists', 10))
    dispatch(playlistActions.getNewReleases(10))
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
        style={{ paddingBottom: SIZES.paddingBottom }}
      >
        <TextTitle label='TOP ARTIST AND TRACKS' />
        <View
          style={{
            paddingRight: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            backgroundColor: COLORS.lightGray3,
            padding: 10,
            borderRadius: 20,
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
                ...FONTS.h3,
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
        ListHeaderComponent={<Header />}
        ListFooterComponent={
          <View style={{ paddingBottom: 120 }}>
            <HorizontalCardContainer
              cardItemTextStyle={{
                paddingLeft: 20,
                position: 'absolute',
                bottom: SIZES.padding,
              }}
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
            <HorizontalCardContainer
              cardItemImageStyle={{ opacity: 1 }}
              cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
              data={playlist.topLists}
              label='POPULAR'
            />
            {/* featured */}
            <View style={{ paddingBottom: SIZES.paddingBottom }}>
              <TextTitle label='FEATURED' />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ImageBackground
                  resizeMode='repeat'
                  source={{ uri: playlist.featured[0].images[0].url }}
                  style={{
                    width: '100%',
                    height: 210,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TextButton
                    label='CHECK IT OUT'
                    buttonContainerStyle={{
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderColor: COLORS.white,
                    }}
                  />
                </ImageBackground>
              </View>
            </View>
            <HorizontalCardContainer
              cardItemImageStyle={{ opacity: 1 }}
              cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
              data={playlist.newReleases}
              label='NEW RELEASES'
            />
          </View>
        }
      />
    </View>
  )
}

export default Home
