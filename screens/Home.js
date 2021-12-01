import React, { useEffect } from 'react'
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, FONTS, SIZES } from '../constants'
import * as userActions from '../store/actions/user'
import * as playlistActions from '../store/actions/playlist'
import * as playerActions from '../store/actions/audioPlayer'

import {
  TextButton,
  HorizontalCardContainer,
  Header,
  TextTitle,
} from '../components'

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.user)
  const playlist = useSelector((state) => state.playlist)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getTopArtists('long_term', 3))
    dispatch(userActions.getPlaylists(40))
    dispatch(userActions.getRecentlyPlayed(10))
    dispatch(playlistActions.getFeaturedPlaylists(1))
    dispatch(playlistActions.getCategoryPlaylist('toplists', 10))
    dispatch(playlistActions.getNewReleases(10))
    dispatch(playerActions.init())
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
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Header />}
        ListFooterComponent={
          <View style={{ paddingBottom: 120 }}>
            <HorizontalCardContainer
              navigation={navigation}
              cardItemTextStyle={styles.playlistTextStyle}
              data={user.playlists}
              label='MY PLAYLISTS'
            />
            {renderButtons()}
            <HorizontalCardContainer
              navigation={navigation}
              cardItemImageStyle={{ opacity: 1 }}
              cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
              data={user.recentlyPlayed}
              label='RECENTLY PLAYED'
            />
            {renderTopArtistsAndTracksContainer()}
            <HorizontalCardContainer
              navigation={navigation}
              cardItemImageStyle={{ opacity: 1 }}
              cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
              data={playlist.topLists}
              label='POPULAR'
            />
            {/* featured */}
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
              navigation={navigation}
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
