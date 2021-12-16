import { BASE_URL } from '@env'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../index'

import { setHeaders } from '../../utils/helpers'

const initialState = {
  data: {
    display_name: '',
    images: undefined,
  },
  playlists: [
    {
      id: '',
      name: '',
      owner: { display_name: '' },
      tracks: { total: '' },
    },
  ],
  recentlyPlayed: [],
  topArtists: [{ images: undefined }],
  follows: [],
}

export const getUserProfileAsync = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('user/getProfile', async (_, { getState }) => {
  const accessToken = getState().auth.accessToken
  const response = await fetch(`${BASE_URL}/me`, {
    method: 'GET',
    headers: setHeaders(accessToken),
  })
  const data = await response.json()
  return data
})

export const getUserPlaylistAsync = createAsyncThunk<
  any,
  string,
  { state: RootState }
>('user/getPlaylist', async (limit, { getState }) => {
  const accessToken = getState().auth.accessToken
  const response = await fetch(`${BASE_URL}/me/playlists?limit=${limit}`, {
    method: 'GET',
    headers: setHeaders(accessToken),
  })
  const data = await response.json()
  return data
})

export const getUserRecentlyPlayedAsync = createAsyncThunk<
  any,
  string,
  { state: RootState }
>('user/getRecentlyPlayed', async (limit, { getState }) => {
  const accessToken = getState().auth.accessToken
  const response = await fetch(
    `${BASE_URL}/me/player/recently-played?limit=${limit}`,
    {
      method: 'GET',
      headers: setHeaders(accessToken),
    }
  )
  const data = await response.json()
  return data
})

export const getUserTopArtistsAsync = createAsyncThunk<
  any,
  { time_range: string; limit: string },
  { state: RootState }
>('user/getTopArtists', async (args, { getState }) => {
  const accessToken = getState().auth.accessToken
  const response = await fetch(
    `${BASE_URL}/me/top/artists?time_range=${args.time_range}&limit=${args.limit}`,
    {
      method: 'GET',
      headers: setHeaders(accessToken),
    }
  )
  const data = await response.json()
  return data
})

export const getUserFollowsAsync = createAsyncThunk<
  any,
  string,
  { state: RootState }
>('user/getFollows', async (limit, { getState }) => {
  const accessToken = getState().auth.accessToken
  const response = await fetch(
    `${BASE_URL}/me/following?type=artist&limit=${limit}`,
    {
      method: 'GET',
      headers: setHeaders(accessToken),
    }
  )
  const data = await response.json()
  return data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfileAsync.fulfilled, (state, { payload }) => {
      state.data = payload.data
    })
    builder.addCase(getUserPlaylistAsync.fulfilled, (state, { payload }) => {
      state.playlists = payload.data.items
    })
    builder.addCase(
      getUserRecentlyPlayedAsync.fulfilled,
      (state, { payload }) => {
        state.recentlyPlayed = payload.data.items.map((item: any) => {
          const trackName = item.track.name
          const albumName = item.track.album.name
          return { ...item.track.album, name: trackName, albumName }
        })
      }
    )
    builder.addCase(getUserTopArtistsAsync.fulfilled, (state, { payload }) => {
      state.topArtists = payload.data.items
    })
    builder.addCase(getUserFollowsAsync.fulfilled, (state, { payload }) => {
      state.follows = payload.data.artists.items
    })
  },
})

export default userSlice.reducer
