import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '@env'
import { authorize, refresh } from 'react-native-app-auth'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home, Library, Search, Profile } from './screens'
import { icons, COLORS } from './constants'
import TabBarIcon from './components/TabBarIcon'

// const stack = creat
const Tab = createBottomTabNavigator()

const spotifyAuthConfig = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUrl: REDIRECT_URL,
  issuer: 'https://accounts.spotify.com',
  scopes: [
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
    'user-top-read',
  ],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
}

const App = () => {
  useEffect(() => {}, [SplashScreen.hide()])

  // useEffect(() => {
  //   const getAuthCode = async () => {
  //     try {
  //     } catch (error) {
  //       console.log('error', error)
  //     }
  //   }
  //   getAuthCode()
  // }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconSrc
            if (route.name === 'Search') iconSrc = icons.search
            if (route.name === 'Home') iconSrc = icons.home
            if (route.name === 'Library') iconSrc = icons.library
            if (route.name === 'Profile') iconSrc = icons.profile
            return (
              <TabBarIcon
                focused={focused}
                name={route.name}
                source={iconSrc}
              />
            )
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            marginBottom: 30,
            paddingBottom: 0,
            backgroundColor: COLORS.black,
            marginHorizontal: 12,
            borderRadius: 100,
          },
        })}
      >
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Search' component={Search} />
        <Tab.Screen name='Library' component={Library} />
        <Tab.Screen name='Profile' component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})

export default App
