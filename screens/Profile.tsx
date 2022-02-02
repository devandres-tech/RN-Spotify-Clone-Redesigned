import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import {
  Header,
  HorizontalMenu,
  HorizontalCardContainer,
  TextButton,
} from '../components'
import { SIZES, COLORS, FONTS } from '../constants/theme'
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks'
import * as userActions from '../store/slices/userSlice'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './RootStackParams'

type profileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>

const Profile = ({ navigation }: profileScreenProps) => {
  const user = useAppSelector((state) => state.user)
  const playlist = useAppSelector((state) => state.playlist)
  const dispatch = useAppDispatch()
  const [activeMenuItem, setActiveMenuItem] = useState({
    title: 'Overview',
    id: 1,
  })

  useEffect(() => {
    dispatch(userActions.getUserFollowsAsync('10'))
  }, [])

  const menuItems = [
    { title: 'Overview', id: 1 },
    { title: 'Public Playlists', id: 2 },
    { title: `Following(${user.follows.length})`, id: 3 },
  ]

  const renderUserProfile = () => {
    return (
      <View style={styles.userProfileContainer}>
        <Image
          style={styles.userImage}
          source={{
            uri: user.data.images ? user.data.images[0].url : undefined,
          }}
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

  const renderOverView = () => {
    return (
      <View>
        <HorizontalCardContainer
          label='RECENTLY PLAYED'
          data={user.recentlyPlayed}
        />
        <HorizontalCardContainer
          label='DISCOVER NEW MUSIC'
          data={playlist.newReleases}
        />
      </View>
    )
  }

  const renderUserPublicPlaylists = () => {
    return (
      <View style={{ paddingBottom: 40 }}>
        {user.playlists
          .filter(
            (playlist) =>
              playlist.owner.display_name === user.data.display_name &&
              playlist.public
          )
          .map((filteredPlaylist) => {
            return (
              <TouchableOpacity
                key={filteredPlaylist.id}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('Media', {
                    mediaType: filteredPlaylist.type,
                    mediaId: filteredPlaylist.id,
                  })
                }
              >
                <View style={styles.publicPlaylistContainer}>
                  <Image
                    style={{ width: 60, height: 60, marginRight: 20 }}
                    source={{ uri: filteredPlaylist.images[0].url }}
                  />
                  <View>
                    <Text style={styles.publicPlaylistTitle}>
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
              key={artist.id}
              activeOpacity={0.7}
              style={styles.userFollowsContainer}
            >
              <Image
                style={styles.artistImage}
                source={{ uri: artist.images[0].url }}
              />
              <View style={{ flex: 2 }}>
                <Text
                  style={{
                    color: COLORS.white,
                    paddingBottom: 4,
                    ...FONTS.h3,
                  }}
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
                label='following'
                buttonContainerStyle={styles.textButton}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  return (
    <View style={styles.profileScreen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Header />
          {renderUserProfile()}
          <HorizontalMenu
            activeMenuItem={activeMenuItem}
            setActiveMenuItem={setActiveMenuItem}
            menuItems={menuItems}
          />
        </View>

        <View style={{ paddingBottom: 120 }}>
          {activeMenuItem.id === 1 && renderOverView()}
          {activeMenuItem.id === 2 && renderUserPublicPlaylists()}
          {activeMenuItem.id === 3 && renderUserFollows()}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  profileScreen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.black,
    paddingTop: SIZES.padding,
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
    marginRight: 18,
  },
  publicPlaylistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: SIZES.padding,
  },
  publicPlaylistTitle: {
    color: COLORS.white,
    paddingBottom: 5,
    ...FONTS.h3,
  },
  userFollowsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: SIZES.padding,
  },
  artistImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  textButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.white,
    height: 35,
  },
})

export default Profile
