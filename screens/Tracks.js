import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'

import { COLORS, FONTS, SIZES } from '../constants'
import * as playlistActions from '../store/actions/playlist'
import { TextTitle } from '../components'

const Tracks = ({ route: { params } }) => {
  const playlist = useSelector((state) => state.playlist)
  const dispatch = useDispatch()
  const { id, albumImageUrl, playlistTitle } = params

  useEffect(() => {
    dispatch(playlistActions.getPlaylistTracks(id))
  }, [id])

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <View>
        <StatusBar
          animated={true}
          barStyle={'light-content'}
          backgroundColor={COLORS.black}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <Image
            style={{ height: 400, width: '100%' }}
            source={{ uri: albumImageUrl }}
          />
          <LinearGradient
            style={{
              position: 'absolute',
              height: 220,
              width: '100%',
              bottom: 0,
            }}
            colors={[
              'rgba(7, 7, 7, 0.00)',
              'rgba(7, 7, 7, 0.34)',
              'rgba(63, 63, 63, 0.71)',
              'rgba(7, 7, 7, 0.76)',
              'rgb(7, 7, 7)',
              'rgb(7, 7, 7)',
            ]}
          />
          <TextTitle
            containerStyle={{ textAlign: 'center' }}
            label={playlistTitle.toUpperCase()}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Tracks
