import React, { useEffect } from 'react'
import { View, Text, Image, FlatList } from 'react-native'

import { COLORS, FONTS, SIZES, icons } from '../constants'
import { useSelector, useDispatch } from 'react-redux'
import * as userActions from '../store/actions/user'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Home = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getProfile())
    dispatch(userActions.getPlaylists(10))
  }, [dispatch])

  const renderHeader = () => {
    return (
      <View style={{ paddingTop: SIZES.padding, paddingBottom: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{
              tintColor: COLORS.white,
              height: 25,
              width: 25,
              marginRight: 10,
            }}
            source={icons.spotifyLogoWhite}
          />
          <Text style={{ color: COLORS.white, ...FONTS.greeting }}>
            GOOD MORNING {user.data.display_name.toUpperCase()}
          </Text>
        </View>
      </View>
    )
  }

  const renderUserPlaylists = () => {
    console.log('dispatchn-------------------------')
    return (
      <View>
        <Text style={{ color: COLORS.white, ...FONTS.h1 }}>MY PLAYLISTS</Text>
        <FlatList
          data={user.playlists}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item }) => {
            console.log('item -------', item.images[0].url)
            return (
              <TouchableOpacity>
                <Text style={{ color: '#fff' }}>{item.name}</Text>
                {/* <Image source={item.images[0].url} /> */}
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: SIZES.padding,
        backgroundColor: COLORS.black,
        paddingHorizontal: SIZES.padding,
      }}
    >
      <FlatList
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={renderUserPlaylists()}
      />

      {/* header  */}
      {/* user playlists  */}
      {/* <View>
          <Text style={{ color: COLORS.white, ...FONTS.h1 }}>MY PLAYLISTS</Text>
          <FlatList />
        </View> */}

      {/* recently played */}
      {/* wrapped  */}
      {/* popular */}
      {/* featured */}
      {/* new releases */}
      {/* </StatusBar> */}
    </View>
  )
}

export default Home
