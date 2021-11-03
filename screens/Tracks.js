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
} from 'react-native-reanimated'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

import { COLORS, FONTS, SIZES, icons } from '../constants'
import * as playlistActions from '../store/actions/playlist'
import * as albumActions from '../store/actions/album'
import { TextTitle, TrackItem, TracksHeader } from '../components'
import {
  scrollHandler,
  animateOpacity,
  animateHeight,
  animateScale,
} from '../utils/helpers'

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

  // TODO: remove and make one function,
  // make the parameters have the same
  const renderPlaylistTracks = ({ item: { track } }) => {
    const images = track.album.images
    return (
      <TrackItem
        explicit={track.explicit}
        duration={track.duration_ms}
        trackName={track.name}
        artists={track.album.artists}
        albumImageUrl={images.length > 0 ? images[0].url : icons.musicAlbum}
        animateScale={() => animateScale(scrollY)}
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
            width: '100%',
            backgroundColor: COLORS.lightGray3,
            position: 'static',
            alignItems: 'center',
            justifyContent: 'center',
          },
          animateOpacity(scrollY),
          animateHeight(scrollY),
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
            ListHeaderComponent={
              <TracksHeader
                type={type}
                imageUrl={playlist.album.images[0].url}
                title={playlist.album.name}
                totalTracks={playlist.album.tracks.items.length}
                mediaDescription={playlist.album.description}
                followers={playlist.album.followers.total}
                scrollY={scrollY}
                animateScale={() => animateScale(scrollY)}
              />
            }
            data={playlist.album.tracks.items}
            renderItem={renderPlaylistTracks}
          />
        )}
        {type === 'album' && (
          <FlatList
            ListHeaderComponent={
              <TracksHeader
                type={type}
                imageUrl={album.album.images[0].url}
                title={album.album.name}
                totalTracks={album.album.total_tracks}
                releaseDate={album.album.release_date}
                scrollY={scrollY}
                animateScale={() => animateScale(scrollY)}
              />
            }
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
