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
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { COLORS, icons, FONTS } from '../constants'
import { trimText } from '../utils/helpers'
import * as tracksActions from '../store/slices/trackSlice'
import * as audioPlayerActions from '../store/slices/audioPlayerSlice'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './RootStackParams'
import {
  animateOpacity,
  animateHeight,
  animateScale,
} from '../utils/animations'
import {
  TrackItem,
  TracksHeader,
  AudioPlayer,
  LoadingSpinner,
} from '../components'

type tracksScreenProps = NativeStackScreenProps<RootStackParamList, 'Tracks'>

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const Tracks = ({ route: { params }, navigation }: tracksScreenProps) => {
  const scrollY = useSharedValue(0)
  const track = useAppSelector((state) => state.track)
  const player = useAppSelector((state) => state.audioPlayer)
  const dispatch = useAppDispatch()
  const { mediaId, mediaType, artist, isSearchItem } = params

  useEffect(() => {
    if (mediaType === 'playlist') {
      dispatch(tracksActions.getPlaylistTracksAsync(mediaId))
    } else if (mediaType === 'album') {
      dispatch(tracksActions.getAlbumTracksAsync(mediaId))
    } else if (mediaType === 'artist') {
      dispatch(tracksActions.getArtistTracksAsync(mediaId))
    }
  }, [mediaId, dispatch, mediaType])

  useEffect(() => {
    dispatch(audioPlayerActions.setTracks(track.tracks.items))
  }, [track])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y
    },
  })

  const renderTracks = ({ item }: any) => {
    return (
      <TrackItem
        trackId={item.id}
        url={item.preview_url}
        explicit={item.explicit}
        trackNumber={track.type === 'album' ? item.track_number : null}
        trackName={item.name}
        artists={item.artists}
        duration={item.duration_ms}
        albumImages={track.type !== 'album' ? item.album.images : undefined}
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
          {mediaType === 'artist'
            ? trimText(artist.name, 34)
            : trimText(track.name, 34)}
        </Text>
      </Animated.View>

      {track.isLoading ? (
        <LoadingSpinner />
      ) : (
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
                    : track?.followers.total
                }
                scrollY={scrollY}
                animateScale={() => animateScale(scrollY)}
              />
            }
            ListFooterComponent={<View style={{ paddingBottom: 160 }} />}
            data={track.tracks.items}
            renderItem={renderTracks}
          />
        </Animated.View>
      )}
      {player.currentTrack.url.length > 0 && (
        <AudioPlayer isSearchItem={isSearchItem} isTracksScreen={true} />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
    height: 280,
    width: '100%',
    backgroundColor: COLORS.lightGray3,
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
