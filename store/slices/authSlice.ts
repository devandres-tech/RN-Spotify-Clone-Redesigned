import { authorize, refresh } from 'react-native-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'

import { spotifyAuthConfig } from '../../utils/spotifyAuthConfig'

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
  tokenIsLoading: false,
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenticateUserAsync.pending, (state) => {
      state.tokenIsLoading = true
    })
    builder.addCase(authenticateUserAsync.fulfilled, (state, action) => {
      const { accessToken, refreshToken, accessTokenExpirationDate } =
        action.payload
      console.log(current(state))
      state.tokenIsLoading = true
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.accessTokenExpirationDate = accessTokenExpirationDate
    })
    builder.addCase(authenticateUserAsync.rejected, (state, action) => {
      state.tokenIsLoading = false
      state.error = action.payload
    })
  },
})

export default authSlice.reducer
