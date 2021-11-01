import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import HTMLView from 'react-native-htmlview'

import { COLORS, FONTS, SIZES, icons } from '../constants'
import * as playlistActions from '../store/actions/playlist'
import * as albumActions from '../store/actions/album'
import { TextTitle, TrackItem } from '../components'

const Tracks = ({ route: { params } }) => {
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

  const renderHeader = (
    imageUrl,
    title,
    totalTracks,
    mediaDescription = '',
    followers = 0,
    releaseDate = ''
  ) => {
    return (
      <View
        style={{
          alignItems: 'center',
          height: 410,
        }}
      >
        <Image
          style={{
            height: '100%',
            width: '100%',
          }}
          source={{ uri: imageUrl }}
        />
        <LinearGradient
          style={{
            position: 'absolute',
            height: 240,
            width: '100%',
            bottom: 0,
          }}
          colors={[
            'rgba(7, 7, 7, 0.00)',
            'rgba(7, 7, 7, 0.34)',
            'rgba(63, 63, 63, 0.71)',
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
        <Text
          style={{
            position: 'relative',
            bottom: 130,
            color: COLORS.lightGray,
            ...FONTS.body,
          }}
        >
          {type.toUpperCase()}
          <Text
            style={{
              color: COLORS.lightGray,
              paddingHorizontal: 4,
              fontSize: 10,
            }}
          >
            {' \u25CF '}
          </Text>
          <Text>{totalTracks} songs</Text>
          {followers > 0 && (
            <>
              <Text
                style={{
                  color: COLORS.lightGray,
                  paddingHorizontal: 4,
                  fontSize: 10,
                }}
              >
                {' \u25CF '}
              </Text>
              <Text
                style={{
                  color: COLORS.lightGray,
                  position: 'relative',
                  bottom: 130,
                  ...FONTS.body,
                }}
              >
                {Number(followers.toFixed(2)).toLocaleString('en-US')} followers
              </Text>
            </>
          )}
          {releaseDate && (
            <>
              <Text
                style={{
                  color: COLORS.lightGray,
                  paddingHorizontal: 4,
                  fontSize: 10,
                }}
              >
                {' \u25CF '}
              </Text>
              <Text
                style={{
                  color: COLORS.lightGray,
                  position: 'relative',
                  bottom: 130,
                  ...FONTS.body,
                }}
              >
                {releaseDate.substring(0, 4)}
              </Text>
            </>
          )}
        </Text>
        {mediaDescription.length > 0 && (
          <HTMLView stylesheet={styles} value={`<p>${mediaDescription}</p>`} />
        )}
      </View>
    )
  }

  const renderPlaylistTracks = ({ item: { track } }) => {
    const images = track.album.images
    if (track.album.images) {
      console.log('music albums', typeof icons.musicAlbum)
    }
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
      {type === 'playlist' && (
        <FlatList
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
