import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, SIZES } from '../constants'
import * as userActions from '../store/actions/user'
import { TextButton, HorizontalCardContainer, Header } from '../components'

const Home = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getProfile())
    dispatch(userActions.getPlaylists(10))
    dispatch(userActions.getRecentlyPlayed(10))
    dispatch(userActions.getTopArtists('long_term', 3))
  }, [dispatch])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: SIZES.paddingTop,
        backgroundColor: COLORS.black,
      }}
    >
      <FlatList
        ListHeaderComponent={
          <Header name={user.data.display_name.split(' ')[0]} />
        }
        ListFooterComponent={
          <View>
            <HorizontalCardContainer
              cardItemTextStyle={{ paddingLeft: 20 }}
              data={user.playlists}
              label='MY PLAYLISTS'
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES.padding,
                paddingBottom: SIZES.paddingBottom,
              }}
            >
              <TextButton
                label='explore'
                buttonContainerStyle={{ paddingHorizontal: 26 }}
              />
              <TextButton
                label='upgrade to premium'
                buttonContainerStyle={{
                  paddingHorizontal: 26,
                  backgroundColor: COLORS.black,
                  borderColor: COLORS.white,
                  borderWidth: 1,
                }}
              />
            </View>
            <HorizontalCardContainer
              cardItemImageStyle={{ opacity: 1 }}
              cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
              data={user.recentlyPlayed}
              label='RECENTLY PLAYED'
            />
          </View>
        }
      />
    </View>
  )
}

export default Home
