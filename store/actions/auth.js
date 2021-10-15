import { authorize, refresh } from 'react-native-app-auth'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL'
export const AUTHENTICATE_LOADING = 'AUTHENTICATE_LOADING'
export const SET_TOKENS = 'SET_TOKENS'
export const REQUEST_REFRESHED_TOKEN = 'REQUEST_REFRESHED_TOKEN'

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

const saveTokensToAsyncStorage = (
  accessToken,
  refreshToken,
  accessTokenExpirationDate
) => {
  AsyncStorage.setItem(
    'authData',
    JSON.stringify({
      accessToken,
      refreshToken,
      accessTokenExpirationDate,
    })
  )
}

export const authenticate = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTHENTICATE_LOADING, tokenIsLoading: true })
      const { accessToken, refreshToken, accessTokenExpirationDate } =
        await authorize(spotifyAuthConfig)

      dispatch({
        type: AUTHENTICATE_SUCCESS,
        accessToken,
        refreshToken,
        tokenIsLoading: false,
      })
      saveTokensToAsyncStorage(
        accessToken,
        refreshToken,
        accessTokenExpirationDate
      )
    } catch (error) {
      dispatch({
        type: AUTHENTICATE_FAIL,
        tokenIsLoading: false,
        accessToken: null,
        refreshToken: null,
        error: error,
      })
    }
  }
}

export const setTokens = (accessToken, refreshToken) => {
  return async (dispatch) => {
    dispatch({
      type: SET_TOKENS,
      accessToken,
      refreshToken,
    })
  }
}

export const requestRefreshedAccessToken = (refreshTokenFromStorage) => {
  return async (dispatch) => {
    try {
      const { accessToken, refreshToken, accessTokenExpirationDate } =
        await refresh(spotifyAuthConfig, {
          refreshToken: refreshTokenFromStorage,
        })

      dispatch({
        type: REQUEST_REFRESHED_TOKEN,
        accessToken,
        refreshToken,
      })
      saveTokensToAsyncStorage(
        accessToken,
        refreshToken,
        accessTokenExpirationDate
      )
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
}
