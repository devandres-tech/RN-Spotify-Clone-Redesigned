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
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, icons, FONTS } from '../constants'
import * as tracksActions from '../store/actions/track'
import { TrackItem, TracksHeader, TextTitle } from '../components'
import { animateOpacity, animateHeight, animateScale } from '../utils/helpers'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const Tracks = ({ route: { params }, navigation }) => {
  const scrollY = useSharedValue(0)
  const track = useSelector((state) => state.track)
  const dispatch = useDispatch()
  const { id, type } = params

  useEffect(() => {
    if (type === 'playlist') {
      dispatch(tracksActions.getPlaylistTracks(id))
    } else if (type === 'album') {
      dispatch(tracksActions.getAlbumTracks(id))
    }
  }, [id, dispatch, type])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y
    },
  })

  const renderTracks = ({ item }) => {
    return (
      <TrackItem
        explicit={track.type === 'playlist' ? item.explicit : null}
        trackNumber={track.type === 'album' ? item.track_number : null}
        trackName={item.name}
        artists={item.artists}
        duration={item.duration_ms}
        albumImages={track.type === 'playlist' ? item.album.images : null}
      />
    )
  }

  console.log('track album -----', track.album.images[0].url)
  console.log('track album 888888888888', track.album.images)

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <StatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={COLORS.black}
      />
      <Animated.View
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

        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          {track.name.length > 35
            ? track.name.substring(0, 35) + '...'
            : track.name.trim()}
        </Text>
      </Animated.View>
      <Animated.View>
        <AnimatedFlatList
          scrollEventThrottle={1}
          onScroll={scrollHandler}
          ListHeaderComponent={
            <TracksHeader
              type={track.type}
              imageUrl={track.images[0].url}
              title={track.name}
              totalTracks={track.tracks.items.length}
              mediaDescription={
                track.type === 'playlist' ? track.description : null
              }
              followers={track.followers.total}
              scrollY={scrollY}
              animateScale={() => animateScale(scrollY)}
            />
          }
          ListFooterComponent={<View style={{ paddingBottom: 120 }} />}
          data={track.tracks.items}
          renderItem={renderTracks}
        />
      </Animated.View>
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
