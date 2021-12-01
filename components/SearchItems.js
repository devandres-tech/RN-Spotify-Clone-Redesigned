import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as playerActions from '../store/actions/audioPlayer'
import { useDispatch } from 'react-redux'

import { COLORS, FONTS } from '../constants'

const SearchItems = ({ items, navigation, searchTerm }) => {
  const dispatch = useDispatch()

  const onSearchItemHandler = async (id, type, itemSelected) => {
    if (type !== 'track') {
      navigation.navigate('Tracks', {
        mediaType: type,
        mediaId: id,
        artist: type === 'artist' ? itemSelected : null,
        isSearchItem: true,
      })
    } else {
      if (itemSelected.preview_url) {
        await dispatch(playerActions.resetPlayer())
        await dispatch(
          playerActions.setCurrentTrack({
            id: itemSelected.id,
            url: itemSelected.preview_url,
            title: itemSelected.name,
            artist: itemSelected.artists
              .map((artist) => artist.name)
              .join(', '),
            genre: '',
            date: '',
            artwork: itemSelected.album.images[0].url,
            duration: itemSelected.duration_ms,
            searchTerm,
          })
        )
        await dispatch(playerActions.playTrack())
      }
    }
  }
  return (
    <View>
      {items.map((item, index) => {
        let albumImageUrl
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
            onPress={() => onSearchItemHandler(item.id, item.type, item)}
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
                    <Text style={styles.bulletDot}>{'\u25CF'}</Text>
                  )}
                  {item.type !== 'artist' && item.type !== 'playlist' && (
                    <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
                      {item.artists.map((artist) => artist.name).join(', ')}
                    </Text>
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

const styles = StyleSheet.create({
  bulletDot: { color: COLORS.lightGray, paddingHorizontal: 4, fontSize: 4 },
})

export default SearchItems
