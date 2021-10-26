import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { Header, HorizontalMenu, HorizontalCardContainer } from '../components'
import { COLORS, FONTS, SIZES } from '../constants'
import * as userActions from '../store/actions/user'
import * as playlistActions from '../store/actions/playlist'

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
          <View style={{ paddingBottom: 120 }}>
            {activeMenuItem.id === 1 && renderOverview()}
          </View>
        }
      />
    </View>
  )
}

export default Profile
