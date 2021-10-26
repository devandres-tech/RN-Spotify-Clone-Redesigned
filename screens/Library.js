import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import {
  Header,
  TextTitle,
  HorizontalMenu,
  HorizontalCardContainer,
  TrackItem,
} from '../components'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, SIZES, FONTS } from '../constants'
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
  const [activeMenuItem, setActiveMenuItem] = useState(menuItems[0])
  const library = useSelector((state) => state.library)
  const playlist = useSelector((state) => state.playlist)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(libraryActions.getTopArtists())
    dispatch(libraryActions.getTopTracks())
    dispatch(libraryActions.getUserTracks())
    dispatch(libraryActions.getUserAlbums())
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
                  <TrackItem
                    albumName={track.albumName}
                    trackName={track.name}
                    albumImageUrl={track.images[0].url}
                  />
                )
              })}
            {activeMenuItem.id === 3 &&
              library.userTracks.map((track) => {
                return (
                  <TrackItem
                    albumName={track.albumName}
                    trackName={track.name}
                    albumImageUrl={track.album.images[0].url}
                  />
                )
              })}
            {activeMenuItem.id === 4 &&
              library.userAlbums.map((album) => {
                return (
                  <TrackItem
                    artist={album.artists[0].name}
                    albumName={album.albumName}
                    albumImageUrl={album.images[0].url}
                  />
                )
              })}
          </View>
        }
      />
    </View>
  )
}

export default Library
