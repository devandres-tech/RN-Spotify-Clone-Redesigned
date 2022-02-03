import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, SIZES, FONTS, icons, MEDIA } from '../constants'
import { trimText, secondsToHHMMSS } from '../utils/helpers'
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks'
import * as trackPlayerActions from '../store/slices/trackPlayerSlice'

interface IMediaItem {
  id: string
  previewUrl: string
  name: string
  albumImages: Array<{ url: string }>
  artists: Array<{ name: string }>
  durationMs: number
  albumName?: string
  index?: number
  explicit?: boolean
  trackNumber?: number
  type?: string
  onPress?: () => void
}

const MediaItem = ({
  index,
  id,
  previewUrl,
  name,
  albumImages,
  albumName,
  artists,
  durationMs,
  explicit,
  trackNumber,
  type,
  onPress,
}: IMediaItem) => {
  const media = useAppSelector((state) => state.media)
  const trackPlayer = useAppSelector((state) => state.trackPlayer)
  const dispatch = useAppDispatch()
  const artistsNames = artists.map((artist) => artist.name).join(', ')
  const secondsFromMs = durationMs / 1000
  const isCurrentMediaItem = trackPlayer.currentTrack.url === previewUrl
  let imageUrl: string | undefined
  if (albumImages.length > 0)
    imageUrl = albumImages[0].url !== '' ? albumImages[0].url : undefined

  const onMediaItemHandler = async () => {
    const selectedTrack = {
      id,
      url: previewUrl,
      title: name,
      artist: artistsNames,
      artwork: imageUrl ? imageUrl : media.images[0].url,
    }
    if (trackPlayer.searchTerm.length > 0) {
      dispatch(trackPlayerActions.setSearchTerm(''))
    }
    dispatch(trackPlayerActions.resetPlayerAsync())
    await dispatch(trackPlayerActions.setCurrentTrackAsync(selectedTrack))
    if (trackPlayer.isShuffle) dispatch(trackPlayerActions.shuffleTracksAsync())
    dispatch(trackPlayerActions.playTrackAsync())
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onMediaItemHandler}>
      <View style={styles.trackItemContainer}>
        {type !== MEDIA.album && (
          <Image
            style={{
              ...styles.albumImage,
              borderColor: isCurrentMediaItem ? COLORS.primary : undefined,
              borderWidth: isCurrentMediaItem ? 2 : 0,
              tintColor: imageUrl ? undefined : COLORS.lightGray,
            }}
            source={imageUrl ? { uri: imageUrl } : icons.musicAlbum}
          />
        )}
        {type === MEDIA.album && (
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
          {name.length > 0 && (
            <Text
              style={{
                color: isCurrentMediaItem ? COLORS.primary : COLORS.white,
                fontWeight: 'bold',
                ...FONTS.body,
              }}
            >
              {name && trimText(name, 30)}
            </Text>
          )}
          {artists && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {explicit ? (
                <View style={{ marginRight: 5 }}>
                  <Image style={styles.artistImage} source={icons.explicit} />
                </View>
              ) : null}
              <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
                {trimText(artistsNames, 30)}
              </Text>
            </View>
          )}
          {albumName && (
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {trimText(albumName, 30)}
            </Text>
          )}
        </View>

        <View style={{ flex: 2, alignItems: 'flex-end' }}>
          {durationMs > 0 && (
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {secondsToHHMMSS(secondsFromMs).slice(1)}
            </Text>
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
  artistImage: {
    height: 13,
    width: 13,
    tintColor: COLORS.lightGray,
  },
  albumImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 20,
  },
})

export default MediaItem
