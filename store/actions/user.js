import { authorize } from 'react-native-app-auth'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '@env'

export const AUTHENTICATE = 'AUTHENTICATE'
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL'

const spotifyAuthConfig = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUrl: REDIRECT_URL,
  issuer: 'https://accounts.spotify.com',
  scopes: [
    'user-read-private',
    'user-read-email',
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

export const authenticate = () => {
  return async (dispatch) => {
    try {
      const response = await authorize(spotifyAuthConfig)
      const accessToken = response['accessToken']
      const refreshToken = response['refreshToken']
      dispatch({ type: AUTHENTICATE, accessToken, refreshToken })
    } catch (error) {
      dispatch({
        type: AUTHENTICATE_FAIL,
        accessToken: null,
        refreshToken: null,
        error: error,
      })
    }
  }
}
