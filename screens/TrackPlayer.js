import React from 'react'
import {
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

import { COLORS, FONTS, SIZES, icons } from '../constants'

const TrackPlayer = ({ navigation }) => {
  const player = useSelector((state) => state.audioPlayer)
  const track = useSelector((state) => state.track)
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <ImageBackground
        style={{ height: 500, width: '100%' }}
        source={{ uri: player.track.artwork }}
        resizeMode='cover'
      >
        <LinearGradient
          style={{
            height: 150,
            width: '100%',
            position: 'absolute',
            bottom: 0,
          }}
          colors={[
            'rgba(7, 7, 7, 0.00)',
            'rgba(7, 7, 7, 0.34)',
            'rgba(7, 7, 7, 0.55)',
            COLORS.black,
          ]}
        />
        {/* progress bar  */}
        <View></View>
        {/* controls  */}
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Image
              style={{ height: 35, width: 35, tintColor: COLORS.white }}
              source={icons.prev}
            />
          </View>
          <View></View>
          <View></View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default TrackPlayer
