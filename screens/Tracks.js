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
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import HTMLView from 'react-native-htmlview'

import { COLORS, FONTS, SIZES } from '../constants'
import * as playlistActions from '../store/actions/playlist'
import { TextTitle } from '../components'

const Tracks = ({ route: { params } }) => {
  const playlist = useSelector((state) => state.playlist)
  const dispatch = useDispatch()
  const { id, albumImageUrl, playlistTitle, description } = params

  useEffect(() => {
    dispatch(playlistActions.getPlaylistTracks(id))
  }, [id])

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      {/* <View> */}
      <StatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={COLORS.black}
      />
      <View
        style={{
          // justifyContent: 'center',
          alignItems: 'center',

          height: 400,
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
            height: 210,
            width: '100%',
            bottom: 0,
            // bottom: 'auto',
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
        {/* <Text style={{ color: COLORS.white }}>{description}</Text> */}
        <HTMLView stylesheet={styles} value={`<p>${description}</p>`} />
        <TextTitle
          containerStyle={{
            textAlign: 'center',

            position: 'relative',
            bottom: 120,
          }}
          label={playlistTitle.toUpperCase()}
        />
      </View>
      {/* </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  a: {
    color: '#FF3366', // make links coloured pink
  },
  p: {
    position: 'relative',
    bottom: 120,
    color: COLORS.white,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingBottom: 25,

    ...FONTS.body,
  },
})

export default Tracks
