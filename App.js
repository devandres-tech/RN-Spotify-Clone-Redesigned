import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '@env'
import { authorize, refresh } from 'react-native-app-auth'
import SplashScreen from 'react-native-splash-screen'

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

  useEffect(() => {
    const getAuthCode = async () => {
      try {
        // const res = await authorize(spotifyAuthConfig)
        // console.log('res', res)
      } catch (error) {
        console.log('error', error)
      }
    }
    getAuthCode()
  }, [])

  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default App
