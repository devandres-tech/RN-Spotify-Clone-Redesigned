import React from 'react'
import { View, FlatList } from 'react-native'

import { SIZES } from '../constants'
import TextTitle from './TextTitle'
import HorizontalCardItem from './HorizontalCardItem'

const HorizontalCardContainer = ({
  data,
  label,
  containerStyle,
  cardItemImageStyle,
  cardItemTextStyle,
}) => {
  return (
    <View
      style={{
        paddingBottom: SIZES.paddingBottom,
        ...containerStyle,
      }}
    >
      <TextTitle label={label} />
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={({ id }) => `${id}`}
        renderItem={({ item }) => {
          return (
            <HorizontalCardItem
              cardItemTextStyle={cardItemTextStyle}
              cardItemImageStyle={cardItemImageStyle}
              label={item.name}
              imageUrl={item.images[0].url}
            />
          )
        }}
      />
    </View>
  )
}

export default HorizontalCardContainer
