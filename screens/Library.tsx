import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import {
  Header,
  TextTitle,
  HorizontalMenu,
  HorizontalCardContainer,
  TrackItem,
} from '../components'
import { useScrollToTop } from '@react-navigation/native'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { COLORS, SIZES, FONTS, LIBRARY_MENU_ITEMS } from '../constants'
import * as libraryActions from '../store/actions/library'
import * as playerActions from '../store/actions/audioPlayer'
import * as playlistActions from '../store/actions/playlist'
import * as userActions from '../store/actions/user'

const Library = ({ navigation }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(LIBRARY_MENU_ITEMS[0])
  const library = useAppSelector((state) => state.library)
  const playlist = useAppSelector((state) => state.playlist)
  const user = useAppSelector((state) => state.user)
  const ref = React.useRef(null)
  const dispatch = useAppDispatch()
  const filteredUserTracks = library.userTracks.filter(
    (track) => track.preview_url !== null
  )

  useScrollToTop(ref)

  useEffect(() => {
    dispatch(libraryActions.getTopArtists())
    dispatch(libraryActions.getTopTracks())
    dispatch(libraryActions.getUserTracks())
    dispatch(libraryActions.getUserAlbums())
    dispatch(userActions.getRecentlyPlayed(10))
    dispatch(playlistActions.getNewReleases(10))
  }, [dispatch])

  useEffect(() => {
    if (activeMenuItem.id === 3) {
      dispatch(playerActions.setTracks(filteredUserTracks))
    }
  }, [activeMenuItem])

  const renderMadeForYouContainer = () => {
    const { topTracks } = library
    return (
      <View>
        <HorizontalCardContainer
          navigation={navigation}
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={library.topArtists}
          label='YOUR TOP ARTISTS'
        />
        <TextTitle label='YOUR TOP TRACKS' />
        <View style={{ paddingBottom: SIZES.paddingBottom }}>
          {topTracks.map((track, idx) => {
            return (
              <TrackItem
                key={`${track.id}-${idx}`}
                index={idx}
                trackId={track.id}
                url={track.preview_url}
                artists={track.artists}
                trackName={track.name}
                albumImages={track.images}
              />
            )
          })}
        </View>
        <HorizontalCardContainer
          navigation={navigation}
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={playlist.newReleases}
          label='NEW RELEASES'
        />
      </View>
    )
  }

  const renderUserLibrarySongs = () => {
    return filteredUserTracks.map((track) => {
      return (
        <TrackItem
          albumName={track.album.name}
          id={track.id}
          url={track.preview_url}
          artists={track.artists}
          trackName={track.name}
          albumImages={track.album.images}
        />
      )
    })
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
        ref={ref}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Header />
            <TextTitle containerStyle={{ ...FONTS.h1 }} label='YOUR LIBRARY' />
            <HorizontalMenu
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
              menuItems={LIBRARY_MENU_ITEMS}
            />
          </View>
        }
        ListFooterComponent={
          <View style={{ paddingBottom: 160 }}>
            {activeMenuItem.id === 1 && renderMadeForYouContainer()}
            {activeMenuItem.id === 2 &&
              user.recentlyPlayed.map((track) => {
                return (
                  <TrackItem
                    key={track.id}
                    url={track.preview_url}
                    artists={track.artists}
                    trackName={track.name}
                    albumImages={track.images}
                  />
                )
              })}
            {activeMenuItem.id === 3 && renderUserLibrarySongs()}
            {activeMenuItem.id === 4 &&
              library.userAlbums.map((album) => {
                return (
                  <TrackItem
                    key={album.id}
                    artists={album.artists}
                    albumName={album.albumName}
                    albumImages={album.images}
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
