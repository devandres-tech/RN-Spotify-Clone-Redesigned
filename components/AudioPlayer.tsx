import React from 'react'
import { View, Text, Image } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import { COLORS, FONTS, icons } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { trimText } from '../utils/helpers'
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks'
import * as trackPlayerActions from '../store/slices/trackPlayerSlice'
import { RootStackParamList } from '../screens/RootStackParams'

type audioPlayerScreenProps = StackNavigationProp<RootStackParamList, 'Media'>

const AudioPlayer = () => {
  const trackPlayer = useAppSelector((state) => state.trackPlayer)
  const dispatch = useAppDispatch()
  const navigation = useNavigation<audioPlayerScreenProps>()

  const onPlayPauseHandler = () => {
    if (trackPlayer.isTrackPlaying)
      dispatch(trackPlayerActions.pauseTrackAsync())
    else dispatch(trackPlayerActions.playTrackAsync())
  }

  const onAudioPlayerHandler = () => {
    navigation.navigate('TrackPlayer')
  }

  return (
    <View
      style={{
        alignSelf: 'center',
        borderRadius: 10,
        width: '94%',
        backgroundColor: COLORS.primaryDark,
        position: 'absolute',
        bottom: 91,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          height: 60,
          width: '100%',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            width: 300,
          }}
          activeOpacity={0.7}
          onPress={onAudioPlayerHandler}
        >
          <View style={{ marginRight: 10 }}>
            {trackPlayer.currentTrack.artwork.length > 0 && (
              <Image
                style={{ height: 50, width: 50, borderRadius: 30 }}
                source={{ uri: trackPlayer.currentTrack.artwork }}
              />
            )}
          </View>
          <View>
            <Text style={{ color: COLORS.white, ...FONTS.bodyBold }}>
              {trimText(trackPlayer.currentTrack.title, 25)}
            </Text>
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {trimText(trackPlayer.currentTrack.artist, 25)}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginLeft: 'auto', paddingRight: 10 }}>
          <TouchableOpacity onPress={onPlayPauseHandler}>
            <Image
              source={trackPlayer.isTrackPlaying ? icons.pause : icons.play}
              style={{ height: 28, width: 28, tintColor: COLORS.white }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AudioPlayer
