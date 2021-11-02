import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Button,
  Dimensions,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import HTMLView from 'react-native-htmlview'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

import { COLORS, FONTS, SIZES, icons } from '../constants'
import * as playlistActions from '../store/actions/playlist'
import * as albumActions from '../store/actions/album'
import { TextTitle, TrackItem } from '../components'

const { height } = Dimensions.get('window')

const Tracks = ({ route: { params }, navigation }) => {
  const scrollY = useSharedValue(0)
  const playlist = useSelector((state) => state.playlist)
  const album = useSelector((state) => state.album)
  const dispatch = useDispatch()
  const { id, type } = params

  useEffect(() => {
    if (type === 'playlist') {
      dispatch(playlistActions.getPlaylist(id))
    } else if (type === 'album') {
      dispatch(albumActions.getAlbum(id))
    }
  }, [id, dispatch, type])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y
    },
  })

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [height * (1 - 1 / (1 + Math.sqrt(5) / 2)), 0],
      [-0.5, 1],
      'clamp'
    )

    return {
      transform: [{ scale: scale }],
    }
  })
  const animateOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 200, 400, height * (1 - 1 / (1 + Math.sqrt(5) / 2))],
      [0, 0, 0, 1],
      'clamp'
    )

    return {
      opacity: opacity,
    }
  })

  const renderHeader = (
    imageUrl,
    title,
    totalTracks,
    mediaDescription = '',
    followers = 0,
    releaseDate = ''
  ) => {
    return (
      <Animated.View
        style={[
          {
            alignItems: 'center',
            height: 520,
          },
        ]}
      >
        <Animated.Image
          style={[
            {
              height: '100%',
              width: '100%',
            },
            animatedStyles,
          ]}
          resizeMode={'cover'}
          source={{ uri: imageUrl }}
        />
        {/* </Animated.View> */}
        <LinearGradient
          style={{
            position: 'absolute',
            height: 280,
            width: '100%',
            bottom: 0,
          }}
          colors={[
            'rgba(7, 7, 7, 0.00)',
            'rgba(7, 7, 7, 0.34)',
            'rgba(7, 7, 7, 0.55)',
            COLORS.black,
            COLORS.black,
            COLORS.black,
          ]}
        />
        <TextTitle
          containerStyle={{
            textAlign: 'center',
            position: 'relative',
            bottom: 120,
          }}
          label={title}
        />
        <View
          style={{
            position: 'relative',
            bottom: 130,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
            {type.toUpperCase()}
          </Text>
          <Text
            style={{
              color: COLORS.lightGray,
              paddingHorizontal: 4,
              fontSize: 5,
            }}
          >
            {' \u25CF '}
          </Text>

          <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
            {totalTracks} songs
          </Text>
          {followers > 0 && (
            <>
              <Text
                style={{
                  color: COLORS.lightGray,
                  paddingHorizontal: 4,
                  fontSize: 5,
                }}
              >
                {' \u25CF '}
              </Text>
              <Text
                style={{
                  color: COLORS.lightGray,
                  position: 'relative',
                  ...FONTS.body,
                }}
              >
                {Number(followers.toFixed(2)).toLocaleString('en-US')} followers
              </Text>
            </>
          )}
          {releaseDate.length > 0 && (
            <>
              <Text
                style={{
                  color: COLORS.lightGray,
                  paddingHorizontal: 4,
                  fontSize: 5,
                }}
              >
                {' \u25CF '}
              </Text>
              <Text
                style={{
                  color: COLORS.lightGray,
                  ...FONTS.body,
                }}
              >
                {releaseDate.substring(0, 4)}
              </Text>
            </>
          )}
        </View>

        {mediaDescription.length > 0 && (
          <Text>
            <HTMLView
              stylesheet={styles}
              value={`<p>${mediaDescription}</p>`}
            />
          </Text>
        )}
      </Animated.View>
    )
  }

  const renderPlaylistTracks = ({ item: { track } }) => {
    const images = track.album.images
    return (
      <TrackItem
        explicit={track.explicit}
        duration={track.duration_ms}
        trackName={track.name}
        artists={track.album.artists}
        albumImageUrl={images.length > 0 ? images[0].url : icons.musicAlbum}
      />
    )
  }

  const renderAlbumTracks = ({ item }) => {
    return (
      <TrackItem
        trackName={item.name}
        artists={item.artists}
        duration={item.duration_ms}
      />
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <StatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={COLORS.black}
      />
      <Animated.View
        style={[
          {
            height: 80,
            width: '100%',
            backgroundColor: COLORS.lightGray3,
            position: 'static',
            alignItems: 'center',
            justifyContent: 'center',
          },
          animateOpacity,
        ]}
      >
        <Animated.Text style={[{ color: COLORS.white }]}>
          Go back fellas
        </Animated.Text>
      </Animated.View>
      <Animated.View>
        {type === 'playlist' && (
          <AnimatedFlatList
            scrollEventThrottle={1}
            onScroll={scrollHandler}
            ListHeaderComponent={renderHeader(
              playlist.album.images[0].url,
              playlist.album.name,
              playlist.album.tracks.items.length,
              playlist.album.description,
              playlist.album.followers.total
            )}
            data={playlist.album.tracks.items}
            renderItem={renderPlaylistTracks}
          />
        )}
        {type === 'album' && (
          <FlatList
            ListHeaderComponent={renderHeader(
              album.album.images[0].url,
              album.album.name,
              album.album.total_tracks,
              undefined,
              undefined,
              album.album.release_date
            )}
            data={album.album.tracks.items}
            renderItem={renderAlbumTracks}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  a: {
    color: COLORS.primary,
  },
  p: {
    position: 'relative',
    bottom: 120,
    color: COLORS.lightGray,
    textAlign: 'center',
    paddingHorizontal: SIZES.padding,
    paddingBottom: 25,
    ...FONTS.body,
  },
})

export default Tracks
