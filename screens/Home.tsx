import React, { useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import {
  Header,
  HorizontalCardContainer,
  TextButton,
  TextTitle,
} from '../components'
import { SIZES, COLORS, FONTS } from '../constants'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import * as userActions from '../store/slices/userSlice'
import * as playlistActions from '../store/slices/playlistSlice'
import * as trackPlayerActions from '../store/slices/trackPlayerSlice'

const Home = () => {
  const user = useAppSelector((state) => state.user)
  const playlist = useAppSelector((state) => state.playlist)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(userActions.getUserPlaylistsAsync('15'))
    dispatch(userActions.getUserRecentlyPlayedAsync('10'))
    dispatch(
      userActions.getUserTopArtistsAsync({
        time_range: 'long_term',
        limit: '3',
      })
    )
    dispatch(
      playlistActions.getCategoryPlaylistAsync({
        categoryId: 'toplists',
        limit: '10',
      })
    )
    dispatch(playlistActions.getFeaturedPlaylistsAsync('1'))
    dispatch(playlistActions.getNewReleasesAsync('10'))
    dispatch(trackPlayerActions.initAsync())
  }, [dispatch])

  const renderButtons = () => {
    return (
      <View style={styles.buttonContainer}>
        <TextButton
          label='explore'
          buttonContainerStyle={{ paddingHorizontal: 26 }}
        />
        <TextButton
          label='upgrade to premium'
          buttonContainerStyle={styles.textButton}
        />
      </View>
    )
  }

  const renderTopArtistsAndTracksContainer = () => {
    const topArtists = [...user.topArtists]
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ paddingBottom: SIZES.paddingBottom }}
      >
        <TextTitle label='TOP ARTIST AND TRACKS' />
        <View style={styles.artistsAndTracksContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.topArtistsAndTracksText}>
              SEE YOUR ALL TIME TOP ARTISTS AND TRACKS
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body }}>
              Your top tracks and artists thought your listening history
            </Text>
          </View>
          {topArtists &&
            topArtists.reverse().map((artist) => {
              return (
                <View key={`${artist.id}`} style={{ width: 30 }}>
                  <Image
                    style={styles.topArtistAndTracksImage}
                    source={
                      artist.images[0].url
                        ? {
                            uri: artist.images[0].url,
                          }
                        : require('../assets/images/image-placeholder.png')
                    }
                  />
                </View>
              )
            })}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <View style={{ paddingBottom: 120 }}>
          <HorizontalCardContainer
            label='MY PLAYLISTS'
            cardItemImageStyle={{ opacity: 0.6 }}
            cardItemTextStyle={styles.playlistTextStyle}
            data={user.playlists}
          />
          {renderButtons()}
          <HorizontalCardContainer
            label='RECENTLY PLAYED'
            data={user.recentlyPlayed}
          />
          {renderTopArtistsAndTracksContainer()}
          <HorizontalCardContainer label='POPULAR' data={playlist.topLists} />
          {/* featured */}
          <View style={{ paddingBottom: SIZES.paddingBottom }}>
            <TextTitle label='FEATURED' />
            <View style={styles.featuredContainer}>
              <ImageBackground
                style={styles.featuredImage}
                resizeMode='repeat'
                source={
                  playlist.featured[0].images[0].url
                    ? {
                        uri: playlist.featured[0].images[0].url,
                      }
                    : require('../assets/images/image-placeholder.png')
                }
              >
                <TextButton
                  label='CHECK IT OUT'
                  buttonContainerStyle={{
                    backgroundColor: COLORS.black,
                    borderWidth: 1,
                  }}
                />
              </ImageBackground>
            </View>
          </View>
          <HorizontalCardContainer
            label='NEW RELEASES'
            data={playlist.newReleases}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.paddingTop,
    backgroundColor: COLORS.black,
    width: '100%',
  },
  playlistTextStyle: {
    paddingLeft: 10,
    position: 'absolute',
    bottom: SIZES.padding,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.paddingBottom,
  },
  textButton: {
    paddingHorizontal: 26,
    backgroundColor: COLORS.black,
    borderColor: COLORS.white,
    borderWidth: 1,
  },
  artistsAndTracksContainer: {
    paddingRight: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.lightGray3,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  topArtistsAndTracksText: {
    color: COLORS.white,
    paddingBottom: 30,
    ...FONTS.h3,
  },
  textContainer: {
    paddingLeft: 45,
    paddingRight: 80,
    justifyContent: 'center',
  },
  topArtistAndTracksImage: {
    height: 135,
    width: 68,
    borderRadius: 20,
  },
  featuredContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredImage: {
    width: '100%',
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home
