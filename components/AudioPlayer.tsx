import React from 'react'
import { View, Image, Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { RootStackParamList } from '../screens/RootStackParams'
import { COLORS, FONTS, icons } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as audioPlayerActions from '../store/slices/audioPlayerSlice'
import { trimText } from '../utils/helpers'

type audioPlayerScreenProps = StackNavigationProp<RootStackParamList, 'Tracks'>

interface IAudioPlayer {
  isTracksScreen?: boolean
}

const AudioPlayer = ({ isTracksScreen }: IAudioPlayer) => {
  const player = useAppSelector((state) => state.audioPlayer)
  const dispatch = useAppDispatch()
  const navigation = useNavigation<audioPlayerScreenProps>()

  const onPlayPauseHandler = async () => {
    if (player.isTrackPlaying) {
      dispatch(audioPlayerActions.pauseTrackAsync())
    } else {
      dispatch(audioPlayerActions.playTrackAsync())
    }
  }

  const onAudioPressHandler = () => {
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
        bottom: isTracksScreen ? 10 : 91,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          height: 65,
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
          onPress={onAudioPressHandler}
          activeOpacity={0.7}
        >
          <View style={{ marginRight: 10 }}>
            {player.currentTrack.artwork.length > 0 && (
              <Image
                style={{ height: 50, width: 50, borderRadius: 30 }}
                source={{ uri: player.currentTrack.artwork }}
              />
            )}
          </View>
          <View>
            <Text style={{ color: COLORS.white, ...FONTS.bodyBold }}>
              {trimText(player.currentTrack.title, 25)}
            </Text>
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {trimText(player.currentTrack.artist, 25)}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 'auto',
            paddingRight: 10,
          }}
        >
          <TouchableOpacity onPress={onPlayPauseHandler}>
            <Image
              source={player.isTrackPlaying ? icons.pause : icons.play}
              style={{ height: 28, width: 28, tintColor: COLORS.white }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AudioPlayer
