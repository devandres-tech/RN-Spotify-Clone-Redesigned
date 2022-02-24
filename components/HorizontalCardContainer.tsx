import React from 'react'
import { View, FlatList } from 'react-native'

import { SIZES } from '../constants'
import TextTitle from './TextTitle'
import HorizontalCardItem from './HorizontalCardItem'

interface IHorizontalCardContainer {
  data: Array<ItemType>
  label: string
  containerStyle?: object
  cardItemImageStyle?: object
  cardItemTextStyle?: object
}

interface ItemType {
  item: object
  index: number
  type: string
  id: string
  name: string
  images: Array<{ url: string }>
  release_date: string
  albumName: string
  album_type: string
  artists: Array<{ name: string }>
  followers?: { total: number }
}

const HorizontalCardContainer = ({
  data,
  label,
  containerStyle,
  cardItemImageStyle,
  cardItemTextStyle,
}: IHorizontalCardContainer) => {
  return (
    <View style={{ paddingBottom: SIZES.paddingBottom, ...containerStyle }}>
      <TextTitle label={label} />
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}-${item.name}-${index}`}
        renderItem={({ item, index }) => {
          return (
            <HorizontalCardItem
              id={item.id}
              cardItemTextStyle={cardItemTextStyle}
              cardItemImageStyle={cardItemImageStyle}
              type={item.type}
              imageUrl={item.images ? item.images[0].url : undefined}
              index={index}
              cardLabel={item.name}
              date={item.release_date}
              albumName={item.albumName}
              artists={item.artists}
              albumType={item.album_type}
            />
          )
        }}
      />
    </View>
  )
}

export default HorizontalCardContainer
