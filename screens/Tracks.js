import React, { useEffect } from 'react'
import {
  View,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
// import Animated, {
//   useSharedValue,
//   useAnimatedScrollHandler,
// } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, icons, FONTS } from '../constants'
import * as tracksActions from '../store/actions/track'
import { animateOpacity, animateHeight, animateScale } from '../utils/helpers'
import { TrackItem, TracksHeader } from '../components'

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const Tracks = ({ route: { params }, navigation }) => {
  // const scrollY = useSharedValue(0)
  const track = useSelector((state) => state.track)
  const dispatch = useDispatch()
  const { mediaId, mediaType, artist } = params

  useEffect(() => {
    if (mediaType === 'playlist')
      dispatch(tracksActions.getPlaylistTracks(mediaId))
    else if (mediaType === 'album')
      dispatch(tracksActions.getAlbumTracks(mediaId))
    else if (mediaType === 'artist')
      dispatch(tracksActions.getArtistTracks(mediaId))
  }, [mediaId, dispatch, mediaType])

  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: (e) => {
  //     scrollY.value = e.contentOffset.y
  //   },
  // })

  const formatText = (text) => {
    return text.length > 35 ? text.substring(0, 35) + '...' : text.trim()
  }

  const renderTracks = ({ item }) => {
    if (item.preview_url) {
      return (
        <TrackItem
          url={item.preview_url}
          explicit={item.explicit}
          trackNumber={track.type === 'album' ? item.track_number : null}
          trackName={item.name}
          artists={item.artists}
          duration={item.duration_ms}
          albumImages={track.type === 'playlist' ? item.album.images : null}
        />
      )
    }
  }

  return (
    // <View />
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <StatusBar
        animated={true}
        r
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
          colors={styles.linearGradientColors}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Image style={styles.backIcon} source={icons.back} />
        </TouchableOpacity>

        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          {mediaType === 'artist'
            ? formatText(artist.name)
            : formatText(track.name)}
        </Text>
      </Animated.View>
      <Animated.View>
        <AnimatedFlatList
          scrollEventThrottle={1}
          onScroll={scrollHandler}
          ListHeaderComponent={
            <TracksHeader
              type={mediaType === 'artist' ? artist.type : track.type}
              imageUrl={
                mediaType == 'artist'
                  ? artist.images[0].url
                  : track.images[0].url
              }
              title={mediaType === 'artist' ? artist.name : track.name}
              totalTracks={track.tracks.items.length}
              mediaDescription={
                track.type === 'playlist' && mediaType !== 'artist'
                  ? track.description
                  : ''
              }
              followers={
                mediaType === 'artist'
                  ? artist.followers.total
                  : track.followers.total
              }
              scrollY={scrollY}
              animateScale={() => animateScale(scrollY)}
            />
          }
          ListFooterComponent={<View style={{ paddingBottom: 120 }} />}
          data={track.tracks.items}
          renderItem={renderTracks}
        />
      </Animated.View> */}

      <View>
        <FlatList
          ListFooterComponent={<View style={{ paddingBottom: 120 }} />}
          data={track.tracks.items}
          renderItem={renderTracks}
        />
      </View>
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
  linearGradientColors: [
    COLORS.black,
    COLORS.black,
    COLORS.black,
    'rgba(7, 7, 7, 0.55)',
    'rgba(7, 7, 7, 0.50)',
  ],
})

export default Tracks
