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

import { COLORS, FONTS, SIZES } from '../constants'
import * as playlistActions from '../store/actions/playlist'

const Tracks = ({ route: { params } }) => {
  const playlist = useSelector((state) => state.playlist)
  const dispatch = useDispatch()
  const { id, albumImageUrl, playlistTitle } = params

  useEffect(() => {
    dispatch(playlistActions.getPlaylistTracks(id))
  }, [id])

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        <StatusBar
          animated={true}
          barStyle={'light-content'}
          backgroundColor={COLORS.black}
        />
        <View style={{ backgroundColor: '' }}>
          <Image
            style={{ height: 400, width: '100%' }}
            source={{ uri: albumImageUrl }}
          />
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
            {playlistTitle}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Tracks
