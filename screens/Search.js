import React, { useEffect, useState } from 'react'
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, FONTS, SIZES, icons } from '../constants'
import * as browseActions from '../store/actions/browse'
import * as searchActions from '../store/actions/search'
import { Header, TextTitle } from '../components'

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const browse = useSelector((state) => state.browse)
  const search = useSelector((state) => state.search)
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

  useEffect(() => {
    dispatch(searchActions.searchItems(searchTerm))
  }, [debouncedSearchTerm])

  const renderCardItems = () => {
    return categories.map((category) => {
      let catId = category.id
      if (browse[catId]) {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ paddingBottom: SIZES.paddingBottom }}
          >
            <View style={styles.cardItemContainer}>
              {browse[catId].reverse().map((categoryPlaylist) => {
                return (
                  <View style={styles.cardItemImageContainer}>
                    <Image
                      style={styles.cardItemImage}
                      source={{ uri: categoryPlaylist.images[0].url }}
                    />
                  </View>
                )
              })}
              <View style={styles.cardItemCategory}>
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

  const searchTermHandler = (item) => {
    setSearchTerm(item)
  }

  const renderSearchResults = () => {
    return (
      <View>
        {search.results.albums.items.map((album) => {
          return (
            <TouchableOpacity style={{ marginBottom: 15 }} activeOpacity={0.7}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ height: 40, width: 40, marginRight: 15 }}>
                  <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: album.images[0].url }}
                  />
                </View>
                <View>
                  <Text style={{ color: COLORS.white, ...FONTS.bodyBold }}>
                    {album.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
                      {album.type}
                    </Text>
                    <Text style={styles.bulletDot}>{'\u25CF'}</Text>
                    <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
                      {album.artists.map((artist) => artist.name).join(', ')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
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
            <View style={styles.searchContainer}>
              <TextInput
                value={searchTerm}
                onChangeText={searchTermHandler}
                placeholder='Search...'
                selectionColor={COLORS.primary}
                placeholderTextColor={'#fff'}
                style={styles.textInput}
              />
              <Image source={icons.search} style={styles.searchIcon} />
            </View>
          </View>
        }
        // ListFooterComponent={
        //   <View style={styles.footerContainer}>{renderCardItems()}</View>
        // }
        // ListFooterComponent={
        //   <View style={styles.footerContainer}>{renderSearchResults()}</View>
        // }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardItemContainer: {
    backgroundColor: COLORS.lightGray3,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row-reverse',
  },
  cardItemImageContainer: { width: 30, position: 'relative', left: 50 },
  cardItemImage: {
    height: 135,
    width: 80,
    borderRadius: 20,
  },
  cardItemCategory: {
    width: 185,
    marginRight: 58,
    justifyContent: 'center',
  },
  searchContainer: {
    marginHorizontal: SIZES.padding,
    paddingHorizontal: 15,
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginBottom: SIZES.paddingBottom,
  },
  textInput: {
    height: 60,
    flex: 1,
    marginLeft: 10,
    color: COLORS.white,
    ...FONTS.body,
  },
  searchIcon: {
    height: 25,
    width: 25,
    tintColor: COLORS.white,
  },
  footerContainer: { paddingBottom: 120, paddingHorizontal: SIZES.padding },
  bulletDot: { color: COLORS.lightGray, paddingHorizontal: 4, fontSize: 4 },
})

export default Search
