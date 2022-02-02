import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'

import { COLORS, FONTS, SIZES } from '../constants'
import {
  Header,
  TextTitle,
  HorizontalMenu,
  HorizontalCardContainer,
  MediaItem,
} from '../components'
import { LIBRARY_MENU_ITEMS } from '../constants/libraryMenuItems'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import * as libraryActions from '../store/slices/librarySlice'
import * as playlistActions from '../store/slices/playlistSlice'

const Library = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(LIBRARY_MENU_ITEMS[0])
  const dispatch = useAppDispatch()
  const library = useAppSelector((state) => state.library)
  const playlist = useAppSelector((state) => state.playlist)
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(libraryActions.getTopArtistsAsync())
    dispatch(libraryActions.getTopTracksAsync())
    dispatch(libraryActions.getUserTracksAsync())
    dispatch(libraryActions.getUserAlbumsAsync())
    dispatch(playlistActions.getNewReleasesAsync('10'))
  }, [dispatch])

  const renderMadeForYouContainer = () => {
    const { topTracks } = library
    return (
      <View>
        <HorizontalCardContainer
          label='YOUR TOP ARTISTS'
          data={library.topArtists}
        />
        <TextTitle label='YOUR TOP TRACKS' />
        <View style={{ paddingBottom: SIZES.paddingBottom }}>
          {topTracks.map((track, idx) => {
            return (
              <MediaItem
                durationMs={0}
                key={`${track.id}=${idx}`}
                index={idx}
                id={track.id}
                name={track.name}
                artists={track.artists}
                previewUrl={track.preview_url}
                albumImages={track.images}
              />
            )
          })}
        </View>
        <HorizontalCardContainer
          label='NEW RELEASES'
          data={playlist.newReleases}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <TextTitle containerStyle={{ ...FONTS.h1 }} label='YOUR LIBRARY' />
        <HorizontalMenu
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
          menuItems={LIBRARY_MENU_ITEMS}
        />
        <View style={{ paddingBottom: 160 }}>
          {activeMenuItem.id === 1 && renderMadeForYouContainer()}
          {activeMenuItem.id == 2 &&
            user.recentlyPlayed.map((track: any) => {
              return (
                <MediaItem
                  durationMs={0}
                  id={track.id}
                  key={track.id}
                  previewUrl={track.preview_url}
                  artists={track.artists}
                  name={track.name}
                  albumImages={track.images}
                />
              )
            })}
          {activeMenuItem.id == 3 &&
            library.userTracks.map((track) => {
              return (
                <MediaItem
                  durationMs={0}
                  albumName={track.album.name}
                  id={track.id}
                  key={track.id}
                  previewUrl={track.preview_url}
                  artists={track.artists}
                  name={track.name}
                  albumImages={track.album.images}
                />
              )
            })}
          {activeMenuItem.id == 4 &&
            library.userAlbums.map((album: any) => {
              return (
                <MediaItem
                  name={''}
                  previewUrl={''}
                  durationMs={0}
                  id={album.id}
                  key={album.id}
                  artists={album.artists}
                  albumName={album.albumName}
                  albumImages={album.images}
                />
              )
            })}
        </View>
      </ScrollView>
    </View>
  )
}

export default Library
