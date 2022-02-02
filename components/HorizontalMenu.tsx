import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import { COLORS, SIZES, FONTS } from '../constants'

interface IHorizontalMenu {
  menuItems: Array<IMenuItemType>
  activeMenuItem: IMenuItemType
  setActiveMenuItem: (item: IMenuItemType) => void
}

interface IMenuItemType {
  title: string
  id: number
}

const HorizontalMenu = ({
  menuItems,
  activeMenuItem,
  setActiveMenuItem,
}: IHorizontalMenu) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        width: '100%',
      }}
    >
      <FlatList
        data={menuItems}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setActiveMenuItem(item)}
              style={{
                marginRight: 20,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color:
                    item.id === activeMenuItem.id
                      ? COLORS.white
                      : COLORS.lightGray,
                  fontWeight: item.id === activeMenuItem.id ? 'bold' : 'normal',
                  ...FONTS.menuText,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  marginTop: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 35,
                  backgroundColor:
                    item.id === activeMenuItem.id
                      ? COLORS.primary
                      : 'transparent',
                  height: 3,
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

export default HorizontalMenu
