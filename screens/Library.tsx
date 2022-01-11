import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'

import {
  Header,
  TextTitle,
  HorizontalMenu,
  HorizontalCardContainer,
  TrackItem,
} from '../components'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { COLORS, SIZES, FONTS, LIBRARY_MENU_ITEMS } from '../constants'
import * as libraryActions from '../store/slices/librarySlice'
import * as audioPlayerActions from '../store/slices/audioPlayerSlice'
import * as playlistActions from '../store/slices/playlistSlice'
import * as userActions from '../store/slices/userSlice'

const Library = () => {
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
    dispatch(libraryActions.getTopArtistsAsync())
    dispatch(libraryActions.getTopTracksAsync())
    dispatch(libraryActions.getUserTracksAsync())
    dispatch(libraryActions.getUserAlbumsAsync())
    dispatch(userActions.getUserRecentlyPlayedAsync('10'))
    dispatch(playlistActions.getNewReleasesAsync('10'))
  }, [dispatch])

  useEffect(() => {
    if (activeMenuItem.id === 3) {
      dispatch(audioPlayerActions.setTracks(filteredUserTracks))
    }
  }, [activeMenuItem])

  const renderMadeForYouContainer = () => {
    const { topTracks } = library
    return (
      <View>
        <HorizontalCardContainer
          label='YOUR TOP ARTISTS'
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={library.topArtists}
        />
        <TextTitle label='YOUR TOP TRACKS' />
        <View style={{ paddingBottom: SIZES.paddingBottom }}>
          {topTracks.map((track, idx) => {
            return (
              <TrackItem
                duration={0}
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
          label='NEW RELEASES'
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={playlist.newReleases}
        />
      </View>
    )
  }

  const renderUserLibrarySongs = () => {
    return filteredUserTracks.map((track) => {
      return (
        <TrackItem
          duration={0}
          albumName={track.album.name}
          trackId={track.id}
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
      <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
        <Header />
        <TextTitle containerStyle={{ ...FONTS.h1 }} label='YOUR LIBRARY' />
        <HorizontalMenu
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
          menuItems={LIBRARY_MENU_ITEMS}
        />
        <View style={{ paddingBottom: 160 }}>
          {activeMenuItem.id === 1 && renderMadeForYouContainer()}
          {activeMenuItem.id === 2 &&
            user.recentlyPlayed.map((track: any) => {
              return (
                <TrackItem
                  duration={0}
                  trackId={track.id}
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
            library.userAlbums.map((album: any) => {
              return (
                <TrackItem
                  url={''}
                  trackName={''}
                  duration={0}
                  trackId={album.id}
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
