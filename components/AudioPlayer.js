import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Image, Text } from 'react-native'

import { COLORS, FONTS, icons } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as playerActions from '../store/actions/audioPlayer'
import TrackPlayer from 'react-native-track-player'

const AudioPlayer = ({ isTracksScreen, navigation }) => {
  const player = useSelector((state) => state.audioPlayer)
  const dispatch = useDispatch()

  const onPlayPauseHandler = async () => {
    if (player.isTrackPlaying) {
      dispatch(playerActions.pauseTrack())
      await TrackPlayer.pause()
    } else {
      dispatch(playerActions.playTrack())
      await TrackPlayer.play()
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
        bottom: isTracksScreen ? 0 : 91,
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
            {player.track.artwork.length > 0 && (
              <Image
                style={{ height: 50, width: 50, borderRadius: 30 }}
                source={{ uri: player.track.artwork }}
              />
            )}
          </View>
          <View>
            <Text style={{ color: COLORS.white, ...FONTS.bodyBold }}>
              {player.track.title.length > 25
                ? `${player.track.title.substring(0, 30).trim()}...`
                : player.track.title}
            </Text>
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {player.track.artist.length > 25
                ? `${player.track.artist.substring(0, 30).trim()}...`
                : player.track.artist}
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
