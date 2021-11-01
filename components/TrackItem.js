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
  explicit,
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
        {albumImageUrl && (
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              marginRight: 20,
              tintColor:
                typeof albumImageUrl === 'string' ? null : COLORS.lightGray,
            }}
            source={
              typeof albumImageUrl === 'string'
                ? { uri: albumImageUrl }
                : albumImageUrl
            }
          />
        )}
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
                  <Image
                    style={{
                      height: 13,
                      width: 13,
                      tintColor: COLORS.lightGray,
                    }}
                    source={icons.explicit}
                  />
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

export default TrackItem
