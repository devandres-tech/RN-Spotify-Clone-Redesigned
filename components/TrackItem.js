import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useSelector, useDispatch } from 'react-redux'
import * as playerActions from '../store/actions/audioPlayer'
import { COLORS, SIZES, FONTS, icons } from '../constants'
import { trimText } from '../utils/helpers'

const TrackItem = ({
  trackId,
  url,
  trackName,
  albumName,
  albumImages,
  artists,
  duration,
  explicit,
  trackNumber,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const player = useSelector((state) => state.audioPlayer)
  const track = useSelector((state) => state.track)
  const dispatch = useDispatch()
  const date = new Date(duration)
  const artistsNames = artists.map((artist) => artist.name).join(', ')

  const onTrackItemHandler = async () => {
    const selectedTrack = {
      id: trackId,
      url,
      title: trackName,
      artist: artistsNames,
      album: albumName,
      genre: '',
      date: '',
      artwork: albumImages ? albumImages[0].url : track.images[0].url,
      duration,
    }
    if (player.currentTrack.url === url) {
      if (isPlaying) {
        dispatch(playerActions.pauseTrack())
        setIsPlaying(false)
      } else {
        dispatch(playerActions.playTrack())
        setIsPlaying(true)
      }
    } else {
      await dispatch(playerActions.resetPlayer())
      await dispatch(playerActions.setCurrentTrack(selectedTrack))
      await dispatch(playerActions.playTrack())
      setIsPlaying(true)
    }
    if (player.isShuffle) {
      dispatch(playerActions.shuffleTracks())
    }
  }

  const renderPlayPauseIcon = () => {
    return isSelectedTrackPlaying ? (
      <Image
        style={styles.pauseIcon}
        source={player.isTrackPlaying ? icons.pause : icons.play}
      />
    ) : (
      <Image style={styles.playIcon} source={icons.play} />
    )
  }

  const isSelectedTrackPlaying = player.currentTrack.url === url

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={url ? onTrackItemHandler : () => {}}
    >
      <View style={styles.trackItemContainer}>
        {track.type !== 'album' && (
          <Image
            style={{
              ...styles.albumImage,
              borderColor: isSelectedTrackPlaying ? COLORS.primary : null,
              borderWidth: isSelectedTrackPlaying ? 2 : 0,
              tintColor: albumImages ? null : COLORS.lightGray,
            }}
            source={
              albumImages
                ? {
                    uri:
                      albumImages[0].url !== ''
                        ? albumImages[0].url
                        : undefined,
                  }
                : icons.musicAlbum
            }
          />
        )}
        {url && renderPlayPauseIcon()}
        {trackNumber && (
          <Text
            style={{
              color: COLORS.lightGray,
              marginRight: 20,
              ...FONTS.body,
            }}
          >
            {trackNumber}
          </Text>
        )}
        <View>
          {trackName && (
            <Text
              style={{
                color: isSelectedTrackPlaying ? COLORS.primary : COLORS.white,
                fontWeight: 'bold',
                ...FONTS.body,
              }}
            >
              {trimText(trackName, 30)}
            </Text>
          )}
          {artists && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {explicit ? (
                <View style={{ marginRight: 5 }}>
                  <Image style={styles.artistImage} source={icons.explicit} />
                </View>
              ) : null}
              <Text
                style={{
                  color: COLORS.lightGray,
                  ...FONTS.body,
                }}
              >
                {trimText(artistsNames, 32)}
              </Text>
            </View>
          )}
          {albumName && (
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {trimText(albumName, 30)}
            </Text>
          )}
        </View>
        <View
          style={{
            flex: 2,
            alignItems: 'flex-end',
          }}
        >
          {duration && (
            <Text
              style={{ color: COLORS.lightGray, ...FONTS.body }}
            >{`${date.getMinutes()}:${date.getSeconds()}`}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  trackItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: SIZES.padding,
    marginBottom: 10,
  },
  albumImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 20,
  },
  playIcon: { height: 15, width: 15, marginRight: 20, tintColor: COLORS.white },
  pauseIcon: {
    height: 15,
    width: 15,
    marginRight: 20,
    tintColor: COLORS.white,
  },
  artistImage: { height: 13, width: 13, tintColor: COLORS.lightGray },
})

export default TrackItem
