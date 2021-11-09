import React, { useEffect } from 'react'
import {
  View,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
// import Animated, {
//   useSharedValue,
//   useAnimatedScrollHandler,
// } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, icons, FONTS } from '../constants'
import * as playlistActions from '../store/actions/playlist'
import * as albumActions from '../store/actions/album'
import { TrackItem, TracksHeader, TextTitle } from '../components'
import { animateOpacity, animateHeight, animateScale } from '../utils/helpers'
const { height } = Dimensions.get('window')

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const Tracks = ({ route: { params }, navigation }) => {
  // const scrollY = useSharedValue(0)
  const playlist = useSelector((state) => state.playlist)
  const album = useSelector((state) => state.album)
  const dispatch = useDispatch()
  const { id, type } = params

  console.log('Tracks:type', type)

  useEffect(() => {
    if (type === 'playlist') {
      dispatch(playlistActions.getPlaylist(id))
    } else if (type === 'album') {
      dispatch(albumActions.getAlbum(id))
    }
  }, [id, dispatch, type])

  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: (e) => {
  //     scrollY.value = e.contentOffset.y
  //   },
  // })

  const renderPlaylistTracks = ({ item: { track } }) => {
    const images = track.album.images
    let albumImage = icons.musicAlbum
    if (images.length > 0) {
      albumImage = images[0].url
    }

    return (
      <TrackItem
        explicit={track.explicit}
        duration={track.duration_ms}
        trackName={track.name}
        artists={track.album.artists}
        albumImageUrl={albumImage}
        animateScale={() => animateScale(scrollY)}
      />
    )
  }

  const renderAlbumTracks = ({ item }) => {
    return (
      <TrackItem
        trackNumber={item.track_number}
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

      {/* <Animated.View
        style={[
          styles.headerContainer,
          animateOpacity(scrollY),
          animateHeight(scrollY),
        ]}
      >
        <LinearGradient
          style={styles.linearGradient}
          colors={[
            COLORS.black,
            COLORS.black,
            COLORS.black,
            'rgba(7, 7, 7, 0.55)',
            'rgba(7, 7, 7, 0.50)',
          ]}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Image style={styles.backIcon} source={icons.back} />
        </TouchableOpacity>
        {type === 'playlist' && (
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
            }}
          >
            {playlist.album.name.length > 35
              ? playlist.album.name.substring(0, 35) + '...'
              : playlist.album.name.trim()}
          </Text>
        )}
        {type === 'album' && (
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
            }}
          >
            {album.album.name.length > 35
              ? album.album.name.substring(0, 35) + '...'
              : album.album.name.trim()}
          </Text>
        )}
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
            ListFooterComponent={<View style={{ paddingBottom: 120 }} />}
            data={playlist.album.tracks.items}
            renderItem={renderPlaylistTracks}
          />
        )}
        {type === 'album' && (
          <AnimatedFlatList
            scrollEventThrottle={1}
            onScroll={scrollHandler}
            ListHeaderComponent={
              <TracksHeader
                type={type}
                imageUrl={album.album.images[0].url}
                title={album.album.name}
                artists={album.album.artists}
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
      </Animated.View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
    height: 280,
    width: '100%',
    backgroundColor: COLORS.lightGray3,
    position: 'static',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
    marginRight: 20,
    marginLeft: 20,
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
})

export default Tracks
