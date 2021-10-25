import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import {
  Header,
  TextTitle,
  HorizontalMenu,
  HorizontalCardContainer,
} from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { COLORS, SIZES, FONTS, icons } from '../constants'
import * as libraryActions from '../store/actions/library'
import * as playlistActions from '../store/actions/playlist'
import * as userActions from '../store/actions/user'

const menuItems = [
  {
    title: 'Made For You',
    id: 1,
  },
  {
    title: 'Recently Played',
    id: 2,
  },
  {
    title: 'Liked Songs',
    id: 3,
  },
  {
    title: 'Albums',
    id: 4,
  },
]

const Library = () => {
  const [activeMenuItem, setActiveMenuItem] = useState({
    title: 'Made For You',
    id: 1,
  })
  const library = useSelector((state) => state.library)
  const playlist = useSelector((state) => state.playlist)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(libraryActions.getTopArtists())
    dispatch(libraryActions.getTopTracks())
    dispatch(userActions.getRecentlyPlayed(10))
    dispatch(playlistActions.getNewReleases(10))
  }, [dispatch])

  const renderMadeForYouContainer = () => {
    return (
      <View>
        <HorizontalCardContainer
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={library.topArtists}
          label='YOUR TOP ARTISTS'
        />
        <HorizontalCardContainer
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={library.topTracks}
          label='YOUR TOP TRACKS'
        />
        <HorizontalCardContainer
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={playlist.newReleases}
          label='NEW RELEASES'
        />
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.black,
        paddingTop: SIZES.paddingTop,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Header />
            <TextTitle containerStyle={{ ...FONTS.h1 }} label='YOUR LIBRARY' />
            <HorizontalMenu
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
              menuItems={menuItems}
            />
          </View>
        }
        ListFooterComponent={
          <View style={{ paddingBottom: 120 }}>
            {activeMenuItem.id === 1 && renderMadeForYouContainer()}
            {activeMenuItem.id === 2 &&
              user.recentlyPlayed.map((track) => {
                return (
                  <TouchableOpacity activeOpacity={0.7}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginBottom: 30,
                        paddingHorizontal: SIZES.padding,
                      }}
                    >
                      {/* album cover */}
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          marginRight: 20,
                        }}
                        source={{ uri: track.images[0].url }}
                      />
                      {/* play / mute icon  */}
                      <Image
                        style={{
                          height: 15,
                          width: 15,
                          marginRight: 20,
                          tintColor: COLORS.white,
                        }}
                        source={icons.play}
                      />
                      <View>
                        <Text style={{ color: COLORS.white, ...FONTS.body }}>
                          {track.name}
                        </Text>
                        <Text
                          style={{ color: COLORS.lightGray, ...FONTS.body }}
                        >
                          {track.albumName.length > 30
                            ? track.albumName.substring(0, 30) + '...'
                            : track.albumName.trim()}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}
          </View>
        }
      />
    </View>
  )
}

export default Library
