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
          <View
            style={{
              backgroundColor: COLORS.lightGray3,
              padding: 10,
              borderRadius: 20,
              flexDirection: 'row-reverse',
            }}
          >
            {browse[catId].reverse().map((categoryPlaylist) => {
              return (
                <View
                  style={{
                    width: 30,
                    position: 'relative',
                    left: 50,
                  }}
                >
                  <Image
                    style={{
                      height: 135,
                      width: 80,
                      borderRadius: 20,
                    }}
                    source={{ uri: categoryPlaylist.images[0].url }}
                  />
                </View>
              )
            })}

            <View
              style={{
                width: 185,
                marginRight: 58,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  paddingBottom: 10,
                  ...FONTS.h2,
                }}
              >
                {category.name.toUpperCase()}
              </Text>
              <Text style={{ color: COLORS.white, ...FONTS.body }}>
                {browse[catId][0].description}
              </Text>
            </View>
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
        paddingHorizontal: SIZES.padding,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Header />}
        ListFooterComponent={
          <View style={{ paddingBottom: 120 }}>{renderCardItems()}</View>
        }
      />
    </View>
  )
}

export default Search
