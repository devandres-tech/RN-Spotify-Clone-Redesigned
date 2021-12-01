import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, FONTS, icons } from '../constants'

const SearchItems = ({ items, navigation }) => {
  const onSearchItemHandler = (id, type, itemSelected) => {
    // TODO if track dispatch player status
    navigation.navigate('Tracks', {
      mediaType: type,
      mediaId: id,
      artist: type === 'artist' ? itemSelected : null,
    })
  }
  return (
    <View>
      {items.map((item, index) => {
        const isValidImages = item.images && item.images.length > 0
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
                    tintColor: item.images ? null : COLORS.lightGray,
                    borderRadius: item.type === 'artist' ? 20 : 0,
                  }}
                  source={
                    isValidImages
                      ? { uri: item.images[0].url }
                      : icons.musicAlbum
                  }
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
                    {item.type}
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
