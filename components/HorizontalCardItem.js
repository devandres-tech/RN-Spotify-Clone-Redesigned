import React from 'react'
import { Text, Image, Platform, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, FONTS, SIZES } from '../constants'

const HorizontalCardItem = ({
  imageUrl,
  cardLabel,
  cardItemImageStyle,
  cardItemTextStyle,
  date,
  type,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        paddingRight: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        width: 145,
      }}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: 135,
          height: 135,
          borderRadius: type === 'album' ? 15 : type === 'artist' ? 70 : 0,
          opacity: 0.6,
          marginBottom: -5,
          ...cardItemImageStyle,
        }}
      />
      {/* main text */}
      <Text
        style={{
          color: COLORS.white,
          // alignSelf: type === 'artist' ? 'center' : 'center',
          alignSelf: 'center',
          ...FONTS.cardItemText,
          ...cardItemTextStyle,
        }}
      >
        {cardLabel.length > 18
          ? cardLabel.toUpperCase().substr(0, 18) + '...'
          : cardLabel.toUpperCase().trim()}
      </Text>

      {/* sub text */}
      {type === 'album' ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: COLORS.lightGray,
              paddingRight: 4,
              ...FONTS.cardItemSubText,
            }}
          >
            {date.substr(0, 4)}
          </Text>

          <Text
            style={{
              color: COLORS.lightGray,
              paddingRight: 4,
              fontSize: 4,
            }}
          >
            {'\u25CF'}
          </Text>
          <Text
            style={{
              color: COLORS.lightGray,
              ...FONTS.cardItemSubText,
            }}
          >
            Album
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

export default HorizontalCardItem
