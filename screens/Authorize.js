import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '@env'
import { authorize, refresh } from 'react-native-app-auth'

import { COLORS } from '../constants'

const spotifyAuthConfig = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUrl: REDIRECT_URL,
  issuer: 'https://accounts.spotify.com',
  scopes: [
    'user-read-private',
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

const Authorize = ({ navigation }) => {
  const login = async () => {
    // console.log('url', REDIRECT_URL)
    try {
      console.log('initial...')
      const res = await authorize(spotifyAuthConfig)
      console.log('res', res)
      // console.log('res', res['accessToken'])
    } catch (error) {
      console.log('error', error)
    }
    console.log('LOGIN finished()')
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.black,
      }}
    >
      <Button onPress={() => login()} title='Login to Spotify' />
    </View>
  )
}

export default Authorize
