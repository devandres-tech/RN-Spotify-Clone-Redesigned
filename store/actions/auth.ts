import { Platform } from 'react-native'
import { authorize, refresh } from 'react-native-app-auth'
import { CLIENT_ID, REDIRECT_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL'
export const AUTHENTICATE_LOADING = 'AUTHENTICATE_LOADING'
export const SET_TOKENS = 'SET_TOKENS'
export const REQUEST_REFRESHED_TOKEN = 'REQUEST_REFRESHED_TOKEN'

const spotifyAuthConfig = {
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
        ? 'http://localhost:5000/api/user/authentication'
        : 'http://10.0.2.2:5000/api/user/authentication',
  },
}

interface IAuthState {
  accessToken: string | null
  refreshToken: string | null
  tokenIsLoading: boolean
  error?: string | null
}

const initialState: IAuthState = {
  accessToken: null,
  refreshToken: null,
  tokenIsLoading: false,
  error: null,
}

const saveTokensToAsyncStorage = (
  accessToken: string,
  refreshToken: string | null,
  accessTokenExpirationDate: string
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
  return async (dispatch: Dispatch) => {
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

export const setTokens = (accessToken: string, refreshToken: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: SET_TOKENS,
      accessToken,
      refreshToken,
    })
  }
}

export const requestRefreshedAccessToken = (
  refreshTokenFromStorage: string
) => {
  return async (dispatch: any) => {
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
