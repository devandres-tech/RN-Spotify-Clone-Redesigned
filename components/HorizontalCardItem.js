import React from 'react'
import { Text, Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, FONTS, SIZES } from '../constants'

const HorizontalCardItem = ({
  imageUrl,
  cardLabel,
  cardItemImageStyle,
  cardItemTextStyle,
  cardItemContainerStyle,
  date,
  type,
  index,
  albumName,
  albumType,
  artists,
  id,
  navigation,
}) => {
  const onCardItemHandler = () => {
    navigation.navigate('Tracks', { id })
  }

  return (
    <TouchableOpacity
      onPress={() => onCardItemHandler()}
      activeOpacity={0.7}
      style={{
        marginRight: 10,
        width: 145,
        marginLeft: index === 0 ? SIZES.padding : 0,
        ...cardItemContainerStyle,
      }}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{
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
          alignSelf: type === 'artist' ? 'center' : 'flex-start',
          ...FONTS.cardItemText,
          ...cardItemTextStyle,
        }}
      >
        {cardLabel.length > 18
          ? cardLabel.toUpperCase().substring(0, 18) + '...'
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
            {albumType === 'single' ? 'Single' : 'Album'}
          </Text>
          <Text
            style={{
              color: COLORS.lightGray,
              paddingHorizontal: 4,
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
            {albumType === 'single' ? (
              <Text>
                {artists[0].name.length > 10
                  ? `${artists[0].name.substring(0, 8).trim()}...`
                  : artists[0].name}
              </Text>
            ) : (
              <Text>
                {albumName.length > 10
                  ? `${albumName.substring(0, 8).trim()}...`
                  : albumName}
              </Text>
            )}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

export default HorizontalCardItem
