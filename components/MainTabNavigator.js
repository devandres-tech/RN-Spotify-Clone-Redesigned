import React, { useEffect, useState } from 'react'
import { Image, View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector, useDispatch } from 'react-redux'

import { Home, Library, Search, Profile } from '../screens'
import { COLORS, FONTS, icons } from '../constants'
import { TabBarIcon } from '../components'

const Tab = createBottomTabNavigator()

const MainTabNavigator = () => {
  const player = useSelector((state) => state.audioPlayer)
  const dispatch = useDispatch()

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Tab.Navigator
        initialRouteName='Search'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            return <TabBarIcon isFocused={focused} name={route.name} />
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            marginBottom: 10,
            paddingBottom: 0,
            backgroundColor: COLORS.black,
            marginHorizontal: 12,
            borderRadius: 100,
            height: 80,
            borderTopColor: COLORS.black,
            shadowColor: '#000',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
          },
        })}
      >
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Search' component={Search} />
        <Tab.Screen name='Library' component={Library} />
        <Tab.Screen name='Profile' component={Profile} />
      </Tab.Navigator>
      {/* audio player */}
      <View
        style={{
          flex: 1,
          alignSelf: 'center',
          borderRadius: 10,
          height: 60,
          width: '94%',
          backgroundColor: 'green',
          position: 'absolute',
          bottom: 91,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
          }}
        >
          <View style={{ paddingVertical: 4, marginRight: 10 }}>
            <Image
              style={{ height: 50, width: 50, borderRadius: 30 }}
              source={{ uri: player.track.artwork }}
            />
          </View>
          <View>
            <Text style={{ color: COLORS.white, ...FONTS.bodyBold }}>
              {player.track.title.length > 25
                ? `${player.track.title.substring(0, 30).trim()}...`
                : player.track.title}
            </Text>
            <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
              {player.track.artist.length > 25
                ? `${player.track.artist.substring(0, 30).trim()}...`
                : player.track.artist}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              paddingRight: 10,
            }}
          >
            <Image
              source={icons.pause}
              style={{ height: 28, width: 28, tintColor: COLORS.white }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default MainTabNavigator
