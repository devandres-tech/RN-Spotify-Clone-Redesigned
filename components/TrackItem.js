import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TrackPlayer from 'react-native-track-player'

import { COLORS, SIZES, FONTS, icons } from '../constants'

const TrackItem = ({
  url,
  trackName,
  albumName,
  albumImages,
  artists,
  duration,
  explicit,
  trackNumber,
}) => {
  const date = new Date(duration)
  const artistsNames = artists.map((artist) => artist.name).join(', ')

  const onTrackItemHandler = async () => {
    await TrackPlayer.setupPlayer({})
    await TrackPlayer.add({
      url,
      title: trackName,
      artist: artistsNames,
      album: albumName,
      genre: '',
      date: '',
      artwork: albumImages[0].url,
      duration,
      // artwork: 'http://example.com/cover.png', // Load artwork from the network
      // duration: 402, // Duration in seconds
    })
    // await TrackPlayer.play()
    console.log('preview url', url)
    // await console.log('playing track')
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onTrackItemHandler}>
      <View style={styles.trackItemContainer}>
        {albumImages && (
          <Image
            style={{
              ...styles.albumImage,
              tintColor: albumImages.length > 0 ? null : COLORS.lightGray,
            }}
            source={
              albumImages.length > 0
                ? { uri: albumImages[0].url }
                : icons.musicAlbum
            }
          />
        )}
        <Image style={styles.playIcon} source={icons.play} />
        {trackNumber && (
          <Text
            style={{ color: COLORS.lightGray, marginRight: 20, ...FONTS.body }}
          >
            {trackNumber}
          </Text>
        )}
        <View>
          {trackName && (
            <Text
              style={{ color: COLORS.white, fontWeight: 'bold', ...FONTS.body }}
            >
              {trackName.length > 30
                ? trackName.substring(0, 30) + '...'
                : trackName.trim()}
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
                {artistsNames.length > 32
                  ? artistsNames.substring(0, 32) + '...'
                  : artistsNames.trim()}
              </Text>
            </View>
          )}
          {albumName && (
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {albumName.length > 30
                ? albumName.substring(0, 30) + '...'
                : albumName.trim()}
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
  artistImage: { height: 13, width: 13, tintColor: COLORS.lightGray },
})

export default TrackItem
