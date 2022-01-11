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
import { useScrollToTop } from '@react-navigation/native'

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import * as browseActions from '../store/slices/browseSlice'
import * as searchActions from '../store/slices/searchSlice'
import { Header, TextTitle, SearchItems, LoadingSpinner } from '../components'
import { useDebounce } from '../hooks/useDebounce'

const Search = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isUserSearching, setIsUserSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const ref = React.useRef(null)
  const browse = useAppSelector((state) => state.browse)
  const search = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()

  useScrollToTop(ref)

  useEffect(() => {
    dispatch(browseActions.getBrowseCategories())
  }, [dispatch])

  useEffect(() => {
    if (debouncedSearchTerm)
      dispatch(searchActions.searchItemsAsync(searchTerm))
  }, [debouncedSearchTerm])

  const searchTermHandler = (item: string) => {
    setSearchTerm(item)
    if (item.length > 0) {
      setIsUserSearching(true)
    } else {
      setIsUserSearching(false)
    }
  }

  const renderCategoryCardItems = () => {
    const browseCategories = [...browse.categories]
    return browseCategories.map((category) => {
      return (
        <TouchableOpacity
          key={category.id}
          activeOpacity={0.7}
          style={{ paddingBottom: SIZES.paddingBottom }}
        >
          <View style={styles.cardItemContainer}>
            {category.images
              .slice()
              .reverse()
              .map((image, index) => (
                <View
                  key={`${image.url}-${index}`}
                  style={styles.cardItemImageContainer}
                >
                  <Image
                    style={styles.cardItemImage}
                    source={{ uri: image.url }}
                  />
                </View>
              ))}
            <View style={styles.cardItemCategory}>
              <Text style={styles.categoryName}>
                {category.name.toUpperCase()}
              </Text>
              <Text style={{ color: COLORS.white, ...FONTS.body }}>
                {category.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  }

  const renderSearchResults = () => {
    if (search.isLoading) return <LoadingSpinner />
    if (!search.results) {
      return (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h1 }}>Could't find</Text>
          <Text
            style={{
              color: COLORS.white,
              marginBottom: SIZES.padding,
              ...FONTS.h1,
            }}
          >
            "{searchTerm}"
          </Text>
          <Text
            style={{
              color: COLORS.lightGray,
              textAlign: 'center',
              ...FONTS.body,
            }}
          >
            Try searching again using a different spelling or keyword
          </Text>
        </View>
      )
    }

    return (
      <View>
        <SearchItems
          navigation={navigation}
          items={search.results.artists.items}
        />
        <SearchItems
          navigation={navigation}
          items={search.results.albums.items}
        />
        <SearchItems
          searchTerm={searchTerm}
          navigation={navigation}
          items={search.results.tracks.items}
        />
        <SearchItems
          navigation={navigation}
          items={search.results.playlists.items}
        />
      </View>
    )
  }

  return (
    <View style={styles.searchScreen}>
      <FlatList
        ref={ref}
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
  footerContainer: {
    paddingBottom: 120,
    paddingHorizontal: SIZES.padding,
  },
  bulletDot: { color: COLORS.lightGray, paddingHorizontal: 4, fontSize: 4 },
})

export default Search
