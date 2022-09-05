import { CLIENT_ID, REDIRECT_URL } from '@env'
import { Platform } from 'react-native'

export const spotifyAuthConfig = {
  clientId: CLIENT_ID,
  redirectUrl: REDIRECT_URL,
  usePKCE: false,
  dangerouslyAllowInsecureHttpRequests: true,
  issuer: 'https://accounts.spotify.com',
  scopes: [
    'playlist-read-private',
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-top-read',
    'user-read-recently-played',
    'user-follow-read',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-modify-playback-state',
    'user-read-playback-position',
  ],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint:
      Platform.OS === 'ios'
        ? 'http://localhost:4000/api/user/authentication'
        : 'http://10.0.2.2:4000/api/user/authentication',
  },
}
