import React from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import BulletDot from './BulletDot'
import { RootStackParamList } from '../screens/RootStackParams'
import { COLORS, FONTS, SIZES, MEDIA } from '../constants'
import { trimText } from '../utils/helpers'

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
}: IHorizontalCardItem) => {
  const navigation = useNavigation<horizontalCardItemNavProps>()

  const onCardItemHandler = () => {
    navigation.navigate('Media', {
      mediaId: id,
      mediaType: type,
    })
  }

  return (
    <TouchableOpacity
      onPress={onCardItemHandler}
      activeOpacity={0.7}
      style={{
        marginRight: 10,
        width: 145,
        marginLeft: index === 0 ? SIZES.padding : 0,
        ...cardItemContainerStyle,
      }}
    >
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : require('../assets/images/image-placeholder.png')
        }
        style={{
          height: 135,
          borderRadius:
            type === MEDIA.album ? 15 : type === MEDIA.artist ? 70 : 0,
          opacity: 1,
          marginBottom: -5,
          ...cardItemImageStyle,
        }}
      />
      {/* main text  */}
      <Text
        style={{
          position: 'relative',
          paddingTop: 15,
          color: COLORS.white,
          alignSelf: type === MEDIA.artist ? 'center' : 'flex-start',
          ...FONTS.cardItemText,
          ...cardItemTextStyle,
        }}
      >
        {trimText(cardLabel?.toUpperCase() as string, 19)}
      </Text>
      {/* sub text  */}
      {type === 'album' ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.date}>{date.substring(0, 4)}</Text>
          <BulletDot />
          <Text style={styles.albumType}>
            {albumType === 'single' ? 'Single' : 'Album'}
          </Text>
          <BulletDot />
          <Text style={{ color: COLORS.lightGray, ...FONTS.cardItemSubText }}>
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
  date: {
    color: COLORS.lightGray,
    ...FONTS.cardItemSubText,
  },
  albumType: {
    color: COLORS.lightGray,
    ...FONTS.cardItemSubText,
  },
})

export default HorizontalCardItem
