import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Header, TextTitle, HorizontalMenu } from '../components'

import { COLORS, SIZES, FONTS } from '../constants'

const menuItems = [
  {
    title: 'Made For You',
    id: 1,
  },
  {
    title: 'Recently Played',
    id: 2,
  },
  {
    title: 'Liked Songs',
    id: 3,
  },
  {
    title: 'Albums',
    id: 4,
  },
]

const Library = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(1)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.black,
        paddingTop: SIZES.paddingTop,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Header />
            <TextTitle containerStyle={{ ...FONTS.h1 }} label='YOUR LIBRARY' />
            <HorizontalMenu menuItems={menuItems} />
          </View>
        }
      />
    </View>
  )
}

export default Library
