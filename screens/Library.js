import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import {
  Header,
  TextTitle,
  HorizontalMenu,
  HorizontalCardContainer,
} from '../components'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, SIZES, FONTS } from '../constants'
import * as libraryActions from '../store/actions/library'

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
  const [activeMenuItem, setActiveMenuItem] = useState({
    title: 'Made For You',
    id: 1,
  })
  const library = useSelector((state) => state.library)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(libraryActions.getTopArtists())
  }, [dispatch])

  const renderMadeForYouContainer = () => {
    // top artists
    // top tracks
    // recomemendations
    return (
      <View>
        <HorizontalCardContainer
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={library.topArtists}
          label='YOUR TOP ARTISTS'
        />
      </View>
    )
  }

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
            <HorizontalMenu
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
              menuItems={menuItems}
            />
          </View>
        }
        ListFooterComponent={
          <View>
            {activeMenuItem.id === 1 && renderMadeForYouContainer()}
            {activeMenuItem.id === 2 && (
              <Text style={{ color: COLORS.white }}>Recently played</Text>
            )}
          </View>
        }
      />
    </View>
  )
}

export default Library
