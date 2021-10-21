import React, { useEffect } from 'react'
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, FONTS, SIZES } from '../constants'
import * as browseActions from '../store/actions/browse'
import { Header } from '../components'

const Search = () => {
  const browse = useSelector((state) => state.browse)
  const dispatch = useDispatch()
  const { categories } = browse

  useEffect(() => {
    dispatch(browseActions.getBrowseCategories(5))
  }, [dispatch])

  useEffect(() => {
    if (categories.length > 1) {
      categories.forEach((category) => {
        dispatch(browseActions.getBrowseCategoriesPlaylists(3, category.id))
      })
    }
  }, [categories])

  const renderCardItems = () => {
    return categories.map((category) => {
      let catId = category.id
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ paddingBottom: SIZES.paddingBottom }}
        >
          {/* <TextTitle label='TOP ARTIST AND TRACKS' /> */}
          <View
            style={{
              paddingRight: SIZES.padding,
              paddingHorizontal: SIZES.padding,
              backgroundColor: COLORS.lightGray3,
              padding: 10,
              borderRadius: 20,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row-reverse',
            }}
          >
            <View
              style={{
                paddingLeft: 45,
                paddingRight: 80,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  paddingBottom: 30,
                  ...FONTS.h2,
                }}
              >
                {category.name.toUpperCase()}
              </Text>
              <Text style={{ color: COLORS.white, ...FONTS.body }}>
                {browse[catId][0].description}
              </Text>
            </View>
            {browse[catId].reverse().map((categoryPlaylist) => {
              return (
                <View style={{ width: 30 }}>
                  <Image
                    style={{
                      height: 135,
                      width: 68,
                      borderRadius: 20,
                    }}
                    source={{ uri: categoryPlaylist.images[0].url }}
                  />
                </View>
              )
            })}
          </View>
        </TouchableOpacity>
      )
    })
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: SIZES.paddingTop,
        backgroundColor: COLORS.black,
        width: '100%',
      }}
    >
      <Header />
      {renderCardItems()}
    </View>
  )
}

export default Search
