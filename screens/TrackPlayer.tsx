import React, { useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Slider from '@react-native-community/slider'
import { useProgress } from 'react-native-track-player'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { COLORS, FONTS, icons } from '../constants'
import { RootStackParamList } from './RootStackParams'
import { secondsToHHMMSS } from '../utils/helpers'
import * as trackPlayerActions from '../store/slices/trackPlayerSlice'

type trackPlayerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TrackPlayer'
>

const MAX_PROGRESS = 30

const TrackPlayer = ({ navigation }: trackPlayerScreenProps) => {
  const trackPlayer = useAppSelector((state) => state.trackPlayer)
  const media = useAppSelector((state) => state.media)
  const { position } = useProgress()
  const dispatch = useAppDispatch()

  const onSliderChange = (value: number) => {
    dispatch(trackPlayerActions.seekToPositionAsync(value))
  }

  const onPreviousTrackHandler = () => {
    if (position < 3) {
      dispatch(trackPlayerActions.playPrevTrackAsync())
      if (trackPlayer.repeat.one) dispatch(trackPlayerActions.repeatAll())
    } else {
      dispatch(trackPlayerActions.seekToPositionAsync(0))
    }
  }

  const onPlayPauseHandler = () => {
    if (trackPlayer.isTrackPlaying)
      dispatch(trackPlayerActions.pauseTrackAsync())
    else dispatch(trackPlayerActions.playTrackAsync())
  }

  const onNextTrackHandler = () => {
    dispatch(trackPlayerActions.playNextTrackAsync())
    if (trackPlayer.repeat.one) dispatch(trackPlayerActions.repeatAll())
  }

  const onShuffleHandler = () => {
    if (trackPlayer.isShuffle)
      dispatch(trackPlayerActions.unShuffleTracksAsync())
    else dispatch(trackPlayerActions.shuffleTracksAsync())
  }

  const onRepeatHandler = () => {
    if (!trackPlayer.repeat.one && !trackPlayer.repeat.all) {
      dispatch(trackPlayerActions.repeatAll())
    } else if (!trackPlayer.repeat.one && trackPlayer.repeat.all) {
      dispatch(trackPlayerActions.repeatOne())
    } else {
      dispatch(trackPlayerActions.unsetRepeat())
    }
  }

  useEffect(() => {
    if (Math.round(position) === MAX_PROGRESS) {
      if (trackPlayer.repeat.one) {
        dispatch(trackPlayerActions.seekToPositionAsync(0))
        dispatch(trackPlayerActions.playTrackAsync())
      } else {
        dispatch(trackPlayerActions.playNextTrackAsync())
      }
    }
  }, [position])

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <ImageBackground
        style={{ height: 500, width: '100%' }}
        resizeMode={'cover'}
        source={{ uri: trackPlayer.currentTrack.artwork }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginTop: Platform.OS === 'android' ? 20 : undefined,
          }}
        >
          <LinearGradient
            style={styles.upperLinearGradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={[
              'rgba(7, 7, 7, 0.00)',
              'rgba(7, 7, 7, 0.55)',
              COLORS.black,
            ]}
          />
          <TouchableOpacity
            style={styles.downArrowContainer}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={{ height: 22, width: 22, tintColor: COLORS.white }}
              source={icons.down_arrow}
            />
          </TouchableOpacity>
          <View style={styles.headerInfoContainer}>
            <Text style={{ color: COLORS.white, marginTop: 10, ...FONTS.body }}>
              PLAYING FROM{' '}
              {trackPlayer.searchTerm.length > 0
                ? 'SEARCH'
                : media.type.toUpperCase()}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.bodyBold }}>
              {trackPlayer.searchTerm.length > 0
                ? `"${trackPlayer.searchTerm}" in Songs`
                : media.name.toUpperCase()}
            </Text>
          </View>
        </View>
        <LinearGradient
          style={styles.lowerLinearGradient}
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
        {/* track info */}
        <View style={styles.trackInfoContainer}>
          <Text
            style={{ color: COLORS.white, textAlign: 'center', ...FONTS.h2 }}
          >
            {trackPlayer.currentTrack.title.toUpperCase()}
          </Text>
          <Text
            style={{
              color: COLORS.lightGray,
              textAlign: 'center',
              ...FONTS.body,
            }}
          >
            {trackPlayer.currentTrack.artist.toUpperCase()}
          </Text>
        </View>
        {/* progress bar  */}
        <View style={styles.progressBarContainer}>
          <Slider
            thumbImage={icons.circle}
            style={{ width: '100%', height: 20, marginHorizontal: 10 }}
            minimumValue={0}
            maximumValue={MAX_PROGRESS}
            tapToSeek={true}
            onValueChange={onSliderChange}
            value={position}
            minimumTrackTintColor={'#fff'}
            maximumTrackTintColor={COLORS.lightGray2}
          />
        </View>
        {/* time */}
        <View style={styles.progressBarTimeContainer}>
          <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
            {secondsToHHMMSS(position)}
          </Text>
          <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
            {secondsToHHMMSS(30)}
          </Text>
        </View>
        {/* controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={onShuffleHandler} activeOpacity={0.7}>
            <Image
              source={icons.shuffle}
              style={{
                height: 28,
                width: 28,
                tintColor: trackPlayer.isShuffle
                  ? COLORS.primary
                  : COLORS.white,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPreviousTrackHandler}
            activeOpacity={0.7}
          >
            <Image
              source={icons.previous}
              style={{ height: 25, width: 25, tintColor: COLORS.white }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPlayPauseHandler}
            style={styles.playPauseContainer}
            activeOpacity={0.7}
          >
            <Image
              source={trackPlayer.isTrackPlaying ? icons.pause : icons.play}
              style={{ height: 25, width: 25, tintColor: COLORS.black }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNextTrackHandler} activeOpacity={0.7}>
            <Image
              source={icons.next}
              style={{ height: 25, width: 25, tintColor: COLORS.white }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRepeatHandler} activeOpacity={0.7}>
            <Image
              source={
                trackPlayer.repeat.all
                  ? icons.repeat
                  : trackPlayer.repeat.one
                  ? icons.repeat_one
                  : icons.repeat
              }
              style={{
                height: 25,
                width: 25,
                tintColor:
                  trackPlayer.repeat.all || trackPlayer.repeat.one
                    ? COLORS.primary
                    : COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  upperLinearGradient: {
    height: 80,
    width: '100%',
    position: 'absolute',
  },
  downArrowContainer: {
    flex: 1,
    paddingLeft: 30,
    justifyContent: 'center',
  },
  headerInfoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30,
  },
  lowerLinearGradient: {
    height: 150,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  trackInfoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    height: 90,
  },
  progressBarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  playPauseContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default TrackPlayer
