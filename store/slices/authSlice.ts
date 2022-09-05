import { authorize, refresh } from 'react-native-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { spotifyAuthConfig } from '../../utils/spotifyAuthConfig'

interface IAuthState {
  accessToken: string
  refreshToken: string | null
  tokenIsLoading?: boolean
  accessTokenExpirationDate?: string
  error?: string | unknown
}

const initialState: IAuthState = {
  accessToken: '',
  refreshToken: '',
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

export const authenticateUserAsync = createAsyncThunk(
  'auth/authenticateUser',
  async (_: void, { rejectWithValue }) => {
    try {
      const { accessToken, refreshToken, accessTokenExpirationDate } =
        await authorize(spotifyAuthConfig)
      // save to device storage
      saveTokensToAsyncStorage(
        accessToken,
        refreshToken,
        accessTokenExpirationDate
      )
      return { accessToken, refreshToken, accessTokenExpirationDate }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const requestRefreshedAccessTokenAsync = createAsyncThunk(
  'auth/refreshAccessToken',
  async (refreshTokenFromStorage: string, { rejectWithValue }) => {
    try {
      const { accessToken, refreshToken, accessTokenExpirationDate } =
        await refresh(spotifyAuthConfig, {
          refreshToken: refreshTokenFromStorage,
        })
      // save to device storage
      saveTokensToAsyncStorage(
        accessToken,
        refreshToken,
        accessTokenExpirationDate
      )
      return { accessToken, refreshToken, accessTokenExpirationDate }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state: any, action: any) => {
      const { accessToken, refreshToken } = action.payload
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateUserAsync.pending, (state) => {
      state.tokenIsLoading = true
    })
    builder.addCase(authenticateUserAsync.fulfilled, (state, { payload }) => {
      const { accessToken, refreshToken, accessTokenExpirationDate } = payload
      Object.assign(state, {
        accessToken,
        refreshToken,
        accessTokenExpirationDate,
        tokenIsLoading: false,
      })
    })
    builder.addCase(authenticateUserAsync.rejected, (state, { payload }) => {
      state.tokenIsLoading = false
      state.error = payload
    })
    builder.addCase(requestRefreshedAccessTokenAsync.pending, (state) => {
      state.tokenIsLoading = true
    })
    builder.addCase(
      requestRefreshedAccessTokenAsync.fulfilled,
      (state, { payload }) => {
        const { accessToken, refreshToken, accessTokenExpirationDate } = payload
        Object.assign(state, {
          accessToken,
          refreshToken,
          accessTokenExpirationDate,
          tokenIsLoading: false,
        })
      }
    )
    builder.addCase(
      requestRefreshedAccessTokenAsync.rejected,
      (state, { payload }) => {
        state.tokenIsLoading = false
        state.error = payload
      }
    )
  },
})

export const { setTokens } = authSlice.actions

export default authSlice.reducer
