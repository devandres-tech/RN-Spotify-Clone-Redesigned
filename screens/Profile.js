import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import {
  Header,
  HorizontalMenu,
  HorizontalCardContainer,
  TextButton,
} from '../components'
import { COLORS, FONTS, SIZES } from '../constants'
import * as userActions from '../store/actions/user'
import * as playlistActions from '../store/actions/playlist'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Profile = () => {
  const user = useSelector((state) => state.user)
  const playlist = useSelector((state) => state.playlist)
  const [activeMenuItem, setActiveMenuItem] = useState({
    title: 'Overview',
    id: 1,
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getProfile())
    dispatch(userActions.getUserFollows(10))
    dispatch(userActions.getRecentlyPlayed(10))
    dispatch(userActions.getPlaylists(40))
    dispatch(playlistActions.getNewReleases(10))
  }, [dispatch])

  const menuItems = [
    {
      title: 'Overview',
      id: 1,
    },
    {
      title: 'Public Playlists',
      id: 2,
    },
    {
      title: `Following(${user.follows.length})`,
      id: 3,
    },
  ]

  const renderUserProfile = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Image
          style={{ width: 100, height: 100, borderRadius: 60, marginRight: 18 }}
          source={{ uri: user.data.images[0].url }}
        />
        <View>
          <Text style={{ color: COLORS.white, ...FONTS.h1 }}>
            {user.data.display_name.toUpperCase()}
          </Text>
          <Text style={{ color: COLORS.white, ...FONTS.body }}>
            {user.data.product}
          </Text>
        </View>
      </View>
    )
  }

  const renderOverview = () => {
    return (
      <View>
        {/* currently playing track  */}
        <HorizontalCardContainer
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={user.recentlyPlayed}
          label='RECENTLY PLAYED'
        />
        <HorizontalCardContainer
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={playlist.newReleases}
          label='DISCOVER NEW MUSIC'
        />
      </View>
    )
  }

  const renderUserPublicPlaylists = () => {
    return (
      <View>
        {user.playlists
          .filter(
            (playlist) =>
              playlist.owner.display_name === user.data.display_name &&
              playlist.public
          )
          .map((filteredPlaylist) => {
            return (
              <TouchableOpacity activeOpacity={0.7}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 30,
                    paddingHorizontal: SIZES.padding,
                  }}
                >
                  <Image
                    style={{ width: 60, height: 60, marginRight: 20 }}
                    source={{ uri: filteredPlaylist.images[0].url }}
                  />
                  <View>
                    <Text
                      style={{
                        color: COLORS.white,
                        paddingBottom: 5,
                        ...FONTS.h3,
                      }}
                    >
                      {filteredPlaylist.name}
                    </Text>
                    <Text style={{ color: COLORS.white, ...FONTS.body }}>
                      Total tracks: {filteredPlaylist.tracks.total}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
      </View>
    )
  }

  const renderUserFollows = () => {
    return (
      <View>
        {user.follows.map((artist) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  marginRight: 10,
                }}
                source={{ uri: artist.images[0].url }}
              />
              <View style={{ flex: 2 }}>
                <Text
                  style={{ color: COLORS.white, paddingBottom: 4, ...FONTS.h3 }}
                >
                  {artist.name}
                </Text>
                <Text style={{ color: COLORS.white, ...FONTS.body }}>
                  {Number(artist.followers.total.toFixed(2)).toLocaleString(
                    'en-US'
                  )}{' '}
                  followers
                </Text>
              </View>
              <TextButton
                buttonContainerStyle={{
                  alignSelf: 'flex-end',
                  paddingHorizontal: 20,
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: COLORS.white,
                  height: 35,
                }}
                label='following'
              />
            </TouchableOpacity>
          )
        })}
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
            {renderUserProfile()}
            <HorizontalMenu
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
              menuItems={menuItems}
            />
          </View>
        }
        ListFooterComponent={
          <View
            style={{ paddingBottom: 120, paddingHorizontal: SIZES.padding }}
          >
            {activeMenuItem.id === 1 && renderOverview()}
            {activeMenuItem.id === 2 && renderUserPublicPlaylists()}
            {activeMenuItem.id === 3 && renderUserFollows()}
          </View>
        }
      />
    </View>
  )
}

export default Profile
