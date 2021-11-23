import React, { useEffect, useState } from 'react'
import { Image, View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector, useDispatch } from 'react-redux'

import { Home, Library, Search, Profile } from '../screens'
import { COLORS, FONTS, icons } from '../constants'
import { TabBarIcon, AudioPlayer } from '../components'

const Tab = createBottomTabNavigator()

const MainTabNavigator = ({ navigation }) => {
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

      {player.track.url.length > 0 && <AudioPlayer navigation={navigation} />}
    </View>
  )
}

export default MainTabNavigator
