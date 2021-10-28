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

import { COLORS, FONTS, SIZES } from '../constants'
import * as playlistActions from '../store/actions/playlist'
import { TextTitle, TrackItem } from '../components'

const Tracks = ({ route: { params } }) => {
  const playlist = useSelector((state) => state.playlist)
  const dispatch = useDispatch()
  const { id, albumImageUrl, playlistTitle, description } = params

  useEffect(() => {
    dispatch(playlistActions.getPlaylistTracks(id))
  }, [id])

  const renderHeader = () => {
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
          source={{ uri: albumImageUrl }}
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
          label={playlistTitle.toUpperCase()}
        />
        <HTMLView stylesheet={styles} value={`<p>${description}</p>`} />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <StatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={COLORS.black}
      />
      <FlatList
        ListHeaderComponent={renderHeader()}
        data={playlist.tracks}
        renderItem={({ item }) => {
          return (
            <TrackItem
              duration={item.duration_ms}
              trackName={item.name}
              artist={item.album.artists[0].name}
              albumImageUrl={item.album.images[0].url}
            />
          )
        }}
      />
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
