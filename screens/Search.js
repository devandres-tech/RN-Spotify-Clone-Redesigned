import React, { useEffect, useState, useCallback } from 'react'
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
import { Header, TextTitle, SearchItems } from '../components'

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
  const [isUserSearching, setIsUserSearching] = useState(false)
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
    if (debouncedSearchTerm) dispatch(searchActions.searchItems(searchTerm))
  }, [debouncedSearchTerm])

  const searchTermHandler = (item) => {
    setSearchTerm(item)
    if (item.length > 0) {
      setIsUserSearching(true)
    } else {
      setIsUserSearching(false)
    }
  }

  const renderCategoryCardItems = () => {
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
                <Text style={styles.categoryName}>
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

  const renderSearchResults = () => {
    return (
      <View>
        <SearchItems items={search.results.artists.items} />
        <SearchItems items={search.results.albums.items} />
        <SearchItems items={search.results.tracks.items} />
        <SearchItems items={search.results.playlists.items} />
      </View>
    )
  }

  return (
    <View style={styles.searchScreen}>
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
        ListFooterComponent={
          <View style={styles.footerContainer}>
            {isUserSearching
              ? renderSearchResults()
              : renderCategoryCardItems()}
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchScreen: {
    flex: 1,
    paddingTop: SIZES.paddingTop,
    backgroundColor: COLORS.black,
    width: '100%',
  },
  cardItemContainer: {
    backgroundColor: COLORS.lightGray3,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row-reverse',
  },
  categoryName: { color: COLORS.white, paddingBottom: 10, ...FONTS.h2 },
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
