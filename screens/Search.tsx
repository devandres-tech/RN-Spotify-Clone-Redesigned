import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Header, LoadingSpinner, TextTitle, SearchItem } from '../components'

import { SIZES, COLORS, FONTS, icons } from '../constants'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import * as browseActions from '../store/slices/browseSlice'
import * as searchActions from '../store/slices/searchSlice'
import { useDebounce } from '../hooks/useDebounce'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isUserSearching, setIsUserSearching] = useState(false)
  const browse = useAppSelector((state) => state.browse)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const search = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(browseActions.getBrowseCategories())
  }, [dispatch])

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchActions.searchItemsAsync(searchTerm))
    }
  }, [debouncedSearchTerm])

  const searchTermHandler = (input: string) => {
    setSearchTerm(input)
    if (input.length > 0) setIsUserSearching(true)
    else setIsUserSearching(false)
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
          <Text style={{ color: COLORS.white, ...FONTS.h1 }}>
            Couldn't find
          </Text>
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
        {search.results
          .filter((filteredItem) => filteredItem.preview_url !== null)
          .map((item) => {
            return (
              <SearchItem
                key={`${item.id}`}
                searchTerm={searchTerm}
                id={item.id}
                type={item.type}
                album={item.album}
                images={item.images}
                name={item.name}
                artists={item.artists}
                previewUrl={item.preview_url}
                durationMs={item.duration_ms}
                followers={item.followers}
              />
            )
          })}
      </View>
    )
  }

  const renderCategoryItems = () => {
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
                    source={
                      image.url
                        ? { uri: image.url }
                        : require('../assets/images/image-placeholder.png')
                    }
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

  return (
    <View style={styles.searchScreen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Header />
          {/* search component */}
          <TextTitle label='SEARCH' containerStyle={{ ...FONTS.h1 }} />
          <View style={styles.searchContainer}>
            <TextInput
              value={searchTerm}
              onChangeText={searchTermHandler}
              placeholder='Search...'
              selectionColor={COLORS.primary}
              placeholderTextColor={COLORS.white}
              style={styles.textInput}
            />
            <Image source={icons.search} style={styles.searchIcon} />
          </View>
        </View>
        <View style={styles.footerContainer}>
          {isUserSearching ? renderSearchResults() : renderCategoryItems()}
        </View>
      </ScrollView>
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
  footerContainer: {
    paddingBottom: 120,
    paddingHorizontal: SIZES.padding,
  },
  cardItemContainer: {
    backgroundColor: COLORS.lightGray3,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row-reverse',
  },
  cardItemImageContainer: {
    width: 30,
    position: 'relative',
    left: 50,
  },
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
  categoryName: {
    color: COLORS.white,
    paddingBottom: 10,
    ...FONTS.h2,
  },
  searchIcon: {
    height: 25,
    width: 25,
    tintColor: COLORS.white,
  },
})

export default Search
