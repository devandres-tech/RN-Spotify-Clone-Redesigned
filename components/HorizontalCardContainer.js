import React from 'react'
import { View, FlatList, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, SIZES, FONTS } from '../constants'
import TextTitle from './TextTitle'

const HorizontalCardContainer = ({ data, label, imageUrl }) => {
  return (
    <View style={{ paddingBottom: SIZES.paddingBottom, width: '100%' }}>
      <TextTitle label={label} />
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={({ id }) => `${id}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                paddingRight: SIZES.padding,
                paddingHorizontal: SIZES.padding,
              }}
            >
              <Image
                source={{ uri: item.images[0].url }}
                style={{
                  width: 135,
                  height: 135,
                  borderRadius: 15,
                  opacity: 0.6,
                }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  position: 'absolute',
                  bottom: 10,
                  paddingLeft: 20,
                  ...FONTS.btn,
                }}
              >
                {item.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

export default HorizontalCardContainer
