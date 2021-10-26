import React, { useEffect } from 'react'
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, FONTS, SIZES, icons } from '../constants'
import * as browseActions from '../store/actions/browse'
import { Header, TextTitle } from '../components'

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
      if (browse[catId]) {
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
      }
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
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Header />
            {/* search component */}
            <TextTitle containerStyle={{ ...FONTS.h1 }} label='SEARCH' />
            <View
              style={{
                marginHorizontal: SIZES.padding,
                paddingHorizontal: 15,
                borderColor: COLORS.white,
                borderWidth: 1,
                borderRadius: 50,
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                marginBottom: SIZES.paddingBottom,
              }}
            >
              <TextInput
                placeholder='Search...'
                selectionColor={COLORS.primary}
                placeholderTextColor={'#fff'}
                style={{
                  height: 60,
                  flex: 1,
                  marginLeft: 10,
                  color: COLORS.white,
                  ...FONTS.body,
                }}
              />
              <Image
                source={icons.search}
                style={{ height: 25, width: 25, tintColor: COLORS.white }}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <View
            style={{ paddingBottom: 120, paddingHorizontal: SIZES.padding }}
          >
            {renderCardItems()}
          </View>
        }
      />
    </View>
  )
}

export default Search
