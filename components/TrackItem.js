import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, SIZES, FONTS, icons } from '../constants'

const TrackItem = ({
  trackName,
  albumName,
  albumImageUrl,
  artists,
  duration,
}) => {
  const date = new Date(duration)
  const artistsNames = artists.map((artist) => artist.name).join(', ')

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: SIZES.padding,
          marginBottom: 10,
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
            <Text
              style={{ color: COLORS.white, fontWeight: 'bold', ...FONTS.body }}
            >
              {trackName}
            </Text>
          )}
          {artists && (
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {artistsNames.length > 32
                ? artistsNames.substring(0, 32) + '...'
                : artistsNames.trim()}
            </Text>
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

export default TrackItem
