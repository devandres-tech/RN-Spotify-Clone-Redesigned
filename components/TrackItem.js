import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, SIZES, FONTS, icons } from '../constants'

const TrackItem = ({ trackName, albumName, albumImageUrl, artist }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        borderBottomColor: COLORS.lightGray3,
        borderWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            marginRight: 20,
          }}
          source={{ uri: albumImageUrl }}
        />
        <Image
          style={{
            height: 15,
            width: 15,
            marginRight: 20,
            tintColor: COLORS.white,
          }}
          source={icons.play}
        />
        <View>
          {trackName && (
            <Text style={{ color: COLORS.white, ...FONTS.body }}>
              {trackName}
            </Text>
          )}
          {artist && (
            <Text style={{ color: COLORS.white, ...FONTS.body }}>{artist}</Text>
          )}
          <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
            {albumName.length > 30
              ? albumName.substring(0, 30) + '...'
              : albumName.trim()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TrackItem
