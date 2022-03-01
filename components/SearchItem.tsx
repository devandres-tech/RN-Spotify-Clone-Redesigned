import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { COLORS, FONTS, MEDIA } from '../constants'
import BulletDot from './BulletDot'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../screens/RootStackParams'
import * as trackPlayerActions from '../store/slices/trackPlayerSlice'
import { useAppDispatch } from '../hooks/redux-hooks'

type ISearchItem = {
  id: string
  type: string
  album: { images: Array<{ url: string }>; name: string }
  images: Array<{ url: string }>
  name: string
  artists: Array<{ name: string }>
  previewUrl: string
  durationMs: number
  followers: { total: number }
  searchTerm?: string
}

type searchItemNavProps = StackNavigationProp<RootStackParamList, 'Search'>

const SearchItem = ({
  id,
  type,
  album,
  images,
  name,
  artists,
  previewUrl,
  searchTerm,
}: ISearchItem) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<searchItemNavProps>()

  let albumImageUrl: string | undefined
  if (type === MEDIA.track) {
    albumImageUrl = album.images[0].url
  } else {
    albumImageUrl = images.length > 0 ? images[0].url : ''
  }

  const onSearchItemHandler = () => {
    if (type !== MEDIA.track) {
      navigation.navigate('Media', {
        mediaType: type,
        mediaId: id,
      })
    } else {
      const selectedTrack = {
        id,
        url: previewUrl,
        title: name,
        artist: artists.map((artist) => artist.name).join(', '),
        artwork: albumImageUrl,
      }
      dispatch(trackPlayerActions.resetPlayerAsync())
      dispatch(trackPlayerActions.setCurrentTrackAsync(selectedTrack))
      dispatch(trackPlayerActions.playTrackAsync())
      dispatch(trackPlayerActions.setSearchTerm(searchTerm))
    }
  }

  return (
    <TouchableOpacity
      onPress={() => onSearchItemHandler()}
      activeOpacity={0.7}
      style={{ marginBottom: 15 }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ height: 40, width: 40, marginRight: 15 }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: type === MEDIA.artist ? 20 : 0,
            }}
            source={
              albumImageUrl
                ? { uri: albumImageUrl }
                : require('../assets/images/image-placeholder.png')
            }
          />
        </View>
        <View>
          <Text style={{ color: COLORS.white, ...FONTS.bodyBold }}>{name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {type === MEDIA.track ? 'song' : type}
            </Text>
            {type !== MEDIA.artist && type !== MEDIA.playlist && (
              <>
                <BulletDot />
                <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
                  {artists.map((artist) => artist.name).join(', ')}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SearchItem
