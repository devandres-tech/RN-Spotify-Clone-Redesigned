import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Image, Text } from 'react-native'

import { COLORS, FONTS, icons } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as audioPlayerActions from '../store/actions/audioPlayer'

const AudioPlayer = () => {
  const player = useSelector((state) => state.audioPlayer)
  const dispatch = useDispatch()

  const onPlayPauseHandler = () => {
    if (player.isTrackPlaying) {
      dispatch(audioPlayerActions.pauseTrack())
    } else {
      dispatch(audioPlayerActions.playTrack())
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'center',
        borderRadius: 10,
        height: 60,
        width: '94%',
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 91,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
        }}
      >
        <View style={{ paddingVertical: 4, marginRight: 10 }}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 30 }}
            source={{ uri: player.track.artwork }}
          />
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
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
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
