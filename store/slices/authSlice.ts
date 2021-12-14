import { Platform } from 'react-native'
import { authorize, refresh } from 'react-native-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'

import { spotifyAuthConfig } from '../../utils/spotifyAuthConfig'

export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL'
export const AUTHENTICATE_LOADING = 'AUTHENTICATE_LOADING'
export const SET_TOKENS = 'SET_TOKENS'
export const REQUEST_REFRESHED_TOKEN = 'REQUEST_REFRESHED_TOKEN'

interface IAuthState {
  accessToken: string | null
  refreshToken: string | null
  tokenIsLoading?: boolean
  accessTokenExpirationDate?: string
  error?: string | unknown
}

const initialState: IAuthState = {
  accessToken: null,
  refreshToken: null,
  tokenIsLoading: true,
  error: null,
}

const saveTokensToAsyncStorage = (
  accessToken: string,
  refreshToken: string,
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

export const authenticateUserAsync = createAsyncThunk(
  'auth/authenticateUser',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      console.log('hi')
      const { accessToken, refreshToken, accessTokenExpirationDate } =
        await authorize(spotifyAuthConfig)
      return { accessToken, refreshToken, accessTokenExpirationDate }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenticateUserAsync.pending, (state) => {
      console.log('peding----')
      state.tokenIsLoading = true
    })
    builder.addCase(authenticateUserAsync.fulfilled, (state, action) => {
      const { accessToken, refreshToken, accessTokenExpirationDate } =
        action.payload
      console.log(current(state))
      // state.tokenIsLoading = false
      // state.accessToken = action.payload.accessToken
      // state.refreshToken = refreshToken
      // state.accessTokenExpirationDate = accessTokenExpirationDate
      return { ...action.payload }
    })
    builder.addCase(authenticateUserAsync.rejected, (state, action) => {
      console.log('erororrr----')
      state.tokenIsLoading = false
      state.error = action.payload
    })
  },
})

export default authSlice.reducer
