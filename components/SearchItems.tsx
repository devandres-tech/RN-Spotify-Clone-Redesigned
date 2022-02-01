import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { useAppDispatch } from '../hooks/redux-hooks'
import * as audioPlayerActions from '../store/slices/trackPlayerSlice'
import * as trackActions from '../store/slices/trackSlice'
import { COLORS, FONTS } from '../constants'
import { RootStackParamList } from '../screens/RootStackParams'
import BulletDot from './BulletDot'

interface ISearchItems {
  items: Array<ISearchItem>
  searchTerm: string
}

type ISearchItem = {
  id: string
  type: string
  album: { images: Array<{ url: string }>; name: string }
  images: Array<{ url: string }>
  name: string
  artists: Array<{ name: string }>
  preview_url: string
  duration_ms: number
  followers: { total: number }
}

type searchItemsNavProps = StackNavigationProp<RootStackParamList, 'Search'>

const SearchItems = ({ items, searchTerm }: ISearchItems) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<searchItemsNavProps>()

  const onSearchItemHandler = async (searchItemSelected: ISearchItem) => {
    const { type, id, preview_url, name, artists, album, duration_ms } =
      searchItemSelected
    if (type !== 'track') {
      navigation.navigate('Tracks', {
        mediaType: type,
        mediaId: id,
        artist: type === 'artist' ? searchItemSelected : null,
        isSearchItem: true,
      })
    } else {
      dispatch(audioPlayerActions.resetPlayerAsync())
      dispatch(trackActions.setTrack(searchItemSelected))
      dispatch(audioPlayerActions.setTracks([searchItemSelected]))
      dispatch(
        audioPlayerActions.setCurrentTrackAsync({
          id: id,
          url: preview_url,
          title: name,
          artist: artists.map((artist) => artist.name).join(', '),
          genre: '',
          date: '',
          artwork: album.images[0].url,
          duration: duration_ms,
          searchTerm,
          album: '',
        })
      )
      dispatch(audioPlayerActions.playTrackAsync())
    }
  }
  return (
    <View>
      {items
        .filter((filteredItem) => filteredItem.preview_url !== null)
        .map((item, index) => {
          let albumImageUrl: string | undefined
          const isTrack = item.type === 'track'
          if (isTrack) {
            albumImageUrl = item.album.images[0].url
          } else {
            albumImageUrl =
              item.images && item.images.length > 0
                ? item.images[0].url
                : undefined
          }

          return (
            <TouchableOpacity
              key={`${item.id}-${index}`}
              onPress={() => onSearchItemHandler(item)}
              style={{ marginBottom: 15 }}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={{ height: 40, width: 40, marginRight: 15 }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: item.type === 'artist' ? 20 : 0,
                    }}
                    source={{
                      uri: albumImageUrl,
                    }}
                  />
                </View>
                <View>
                  <Text style={{ color: COLORS.white, ...FONTS.bodyBold }}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
                      {item.type === 'track' ? 'song' : item.type}
                    </Text>
                    {item.type !== 'artist' && item.type !== 'playlist' && (
                      <>
                        <BulletDot />
                        <Text
                          style={{ color: COLORS.lightGray, ...FONTS.body }}
                        >
                          {item.artists.map((artist) => artist.name).join(', ')}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
    </View>
  )
}

export default SearchItems
