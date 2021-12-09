import React from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { RootStackParamList } from '../screens/RootStackParams'
import { COLORS, FONTS, SIZES } from '../constants'
import { trimText } from '../utils/helpers'
import { StackNavigationProp } from '@react-navigation/stack'

type horizontalCardItemNavProps = StackNavigationProp<RootStackParamList>

interface IHorizontalCardItem {
  imageUrl: string | undefined
  cardLabel?: string
  cardItemImageStyle?: object
  cardItemTextStyle?: object
  cardItemContainerStyle?: object
  date: string
  type: string
  index: number
  albumName: string
  albumType: string
  artists: Array<{ name: string }>
  id: string
  artist: object | null
}

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
  artist,
}: IHorizontalCardItem) => {
  const navigation = useNavigation<horizontalCardItemNavProps>()

  const onCardItemHandler = () => {
    navigation.navigate('Tracks', {
      mediaId: id,
      mediaType: type,
      artist,
    })
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
        {trimText(cardLabel.toUpperCase(), 19)}
      </Text>

      {/* sub text */}
      {type === 'album' ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={styles.date}>{date.substr(0, 4)}</Text>
          <Text style={styles.bulletDot}>{'\u25CF'}</Text>
          <Text style={styles.albumType}>
            {albumType === 'single' ? 'Single' : 'Album'}
          </Text>
          <Text style={styles.bulletDot}>{'\u25CF'}</Text>
          <Text
            style={{
              color: COLORS.lightGray,
              ...FONTS.cardItemSubText,
            }}
          >
            {albumType === 'single' ? (
              <Text>{trimText(artists[0].name, 8)}</Text>
            ) : (
              <Text>{trimText(albumName, 8)}</Text>
            )}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  date: { color: COLORS.lightGray, ...FONTS.cardItemSubText },
  bulletDot: { color: COLORS.lightGray, paddingHorizontal: 4, fontSize: 4 },
  albumType: { color: COLORS.lightGray, ...FONTS.cardItemSubText },
})

export default HorizontalCardItem
