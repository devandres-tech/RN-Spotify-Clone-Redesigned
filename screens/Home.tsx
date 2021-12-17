import React, { useEffect } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { COLORS, FONTS, SIZES } from '../constants'
import * as userActions from '../store/slices/userSlice'
import * as playlistActions from '../store/slices/playlistSlice'
import * as audioPlayerActions from '../store/slices/audioPlayerSlice'
import {
  TextButton,
  HorizontalCardContainer,
  Header,
  TextTitle,
} from '../components'

const Home = () => {
  const user = useAppSelector((state) => state.user)
  const playlist = useAppSelector((state) => state.playlist)
  const dispatch = useAppDispatch()
  const ref = React.useRef(null)
  useScrollToTop(ref)

  useEffect(() => {
    dispatch(
      userActions.getUserTopArtistsAsync({
        time_range: 'long_term',
        limit: '3',
      })
    )
    dispatch(userActions.getUserPlaylistsAsync('40'))
    dispatch(userActions.getUserRecentlyPlayedAsync('10'))
    dispatch(playlistActions.getFeaturedPlaylistsAsync('1'))
    dispatch(
      playlistActions.getCategoryPlaylistsAsync({
        categoryId: 'toplists',
        limit: '10',
      })
    )
    dispatch(playlistActions.getNewReleasesAsync('10'))
    dispatch(audioPlayerActions.initAsync())
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
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ paddingBottom: SIZES.paddingBottom }}
      >
        <TextTitle label='TOP ARTIST AND TRACKS' />
        <View style={styles.artistsAndTracksContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.topArtistAndTracksText}>
              SEE YOUR ALL TIME TOP ARTISTS AND TRACKS
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body }}>
              Your top tracks and artist throughout your listening history
            </Text>
          </View>
          {user.topArtists &&
            user.topArtists.reverse().map((artist) => {
              return (
                <View key={`${artist.id}`} style={{ width: 30 }}>
                  <Image
                    style={styles.topArtistAndTracksImage}
                    source={{
                      uri: artist.images ? artist.images[0].url : undefined,
                    }}
                  />
                </View>
              )
            })}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <View style={{ paddingBottom: 120 }}>
          <HorizontalCardContainer
            label='MY PLAYLISTS'
            cardItemTextStyle={styles.playlistTextStyle}
            data={user.playlists}
          />
          {renderButtons()}
          <HorizontalCardContainer
            label='RECENTLY PLAYED'
            cardItemImageStyle={{ opacity: 1 }}
            cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
            data={user.recentlyPlayed}
          />
          {renderTopArtistsAndTracksContainer()}
          <HorizontalCardContainer
            label='POPULAR'
            cardItemImageStyle={{ opacity: 1 }}
            cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
            data={playlist.topLists}
          />
          {/* Featured */}
          <View style={{ paddingBottom: SIZES.paddingBottom }}>
            <TextTitle label='FEATURED' />
            <View style={styles.featuredContainer}>
              <ImageBackground
                resizeMode='repeat'
                source={{
                  uri: playlist.featured[0].images
                    ? playlist.featured[0].images[0].url
                    : undefined,
                }}
                style={styles.featuredImage}
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
            cardItemImageStyle={{ opacity: 1 }}
            cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
            data={playlist.newReleases}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.paddingTop,
    backgroundColor: COLORS.black,
    width: '100%',
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
  textContainer: {
    paddingLeft: 45,
    paddingRight: 80,
    justifyContent: 'center',
  },
  topArtistAndTracksText: {
    color: COLORS.white,
    paddingBottom: 30,
    ...FONTS.h3,
  },
  topArtistAndTracksImage: {
    height: 135,
    width: 68,
    borderRadius: 20,
  },
  playlistTextStyle: {
    paddingLeft: 10,
    position: 'absolute',
    bottom: SIZES.padding,
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
