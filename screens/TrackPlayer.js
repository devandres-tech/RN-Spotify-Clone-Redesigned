import React, { useState, useEffect } from 'react'
import { View, Text, Image, SafeAreaView, ImageBackground } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useProgress } from 'react-native-track-player'
import Slider from '@react-native-community/slider'

import * as playerActions from '../store/actions/audioPlayer'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { secondsToHHMMSS } from '../utils/helpers'

const TrackPlayerScreen = ({ navigation }) => {
  const player = useSelector((state) => state.audioPlayer)
  const [isShuffle, setIsShuffle] = useState(false)
  const track = useSelector((state) => state.track)
  const progress = useProgress()
  const dispatch = useDispatch()

  const onPlayPauseHandler = async () => {
    if (player.isTrackPlaying) {
      dispatch(playerActions.pauseTrack())
    } else {
      dispatch(playerActions.playTrack())
    }
  }

  useEffect(() => {
    console.log('shuffliin??', isShuffle)
  }, [isShuffle])

  const onShuffleHandler = () => {
    if (isShuffle) setIsShuffle(false)
    else setIsShuffle(true)
  }

  const onSliderChange = (value) => {
    dispatch(playerActions.seekToPosition(value))
  }

  const onPreviousTrackHandler = async () => {
    dispatch(playerActions.playPrevTrack())
  }

  const onNextTrackHandler = () => {
    dispatch(playerActions.playNextTrack())
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <ImageBackground
        style={{ height: 500, width: '100%' }}
        source={{ uri: player.currentTrack.artwork }}
        resizeMode='cover'
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <LinearGradient
            style={{
              height: 80,
              width: '100%',
              position: 'absolute',
            }}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={[
              'rgba(7, 7, 7, 0.00)',
              'rgba(7, 7, 7, 0.55)',
              COLORS.black,
            ]}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flex: 1,
              paddingLeft: 30,
              justifyContent: 'center',
            }}
            activeOpacity={0.7}
          >
            <Image
              style={{ height: 22, width: 22, tintColor: COLORS.white }}
              source={icons.down_arrow}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingRight: 30,
            }}
          >
            <Text style={{ color: COLORS.white, marginTop: 10, ...FONTS.body }}>
              PlAYING FROM {track.type.toUpperCase()}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.bodyBold }}>
              {track.name.toUpperCase()}
            </Text>
          </View>
        </View>
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
      </ImageBackground>
      {/* foreground */}
      <View style={{ paddingHorizontal: 30 }}>
        {/* track info  */}
        <View
          style={{
            alignItems: 'center',
            marginBottom: 30,
            height: 90,
          }}
        >
          <Text
            style={{ color: COLORS.white, textAlign: 'center', ...FONTS.h2 }}
          >
            {player.currentTrack.title.toUpperCase()}
          </Text>
          <Text
            style={{
              color: COLORS.lightGray,
              textAlign: 'center',
              ...FONTS.body,
            }}
          >
            {player.currentTrack.artist.toUpperCase()}
          </Text>
        </View>
        {/* progress bar  */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Slider
            thumbImage={icons.circle}
            style={{ width: '100%', height: 20, marginHorizontal: 10 }}
            minimumValue={0}
            maximumValue={30}
            tapToSeek={true}
            onValueChange={onSliderChange}
            value={progress.position}
            minimumTrackTintColor='#FFFFFF'
            maximumTrackTintColor={COLORS.lightGray2}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {secondsToHHMMSS(progress.position)}
            </Text>
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {secondsToHHMMSS(30)}
            </Text>
          </View>
        </View>
        {/* controls  */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={onShuffleHandler} activeOpacity={0.7}>
            <Image
              style={{
                height: 28,
                width: 28,
                tintColor: isShuffle ? COLORS.primary : COLORS.white,
              }}
              source={icons.shuffle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPreviousTrackHandler}
            activeOpacity={0.7}
          >
            <Image
              style={{ height: 25, width: 25, tintColor: COLORS.white }}
              source={icons.previous}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPlayPauseHandler}
            activeOpacity={0.7}
            style={{
              height: 60,
              width: 60,
              backgroundColor: COLORS.white,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={player.isTrackPlaying ? icons.pause : icons.play}
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.black,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNextTrackHandler} activeOpacity={0.7}>
            <Image
              style={{ height: 25, width: 25, tintColor: COLORS.white }}
              source={icons.next}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              style={{ height: 28, width: 28, tintColor: COLORS.white }}
              source={icons.repeat}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default TrackPlayerScreen
