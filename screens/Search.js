import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, FONTS, SIZES } from '../constants'
import * as browseActions from '../store/actions/browse'
import { Header } from '../components'

const Search = () => {
  const browse = useSelector((state) => state.browse)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(browseActions.getBrowseCategories(15))
  }, [dispatch])

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
      <Text>Search</Text>
    </View>
  )
}

export default Search
