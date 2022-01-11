import { BASE_URL } from '@env'
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { RootState } from '../index'

import { setHeaders } from '../../utils/helpers'

const initialState = {
  data: {
    display_name: '',
    images: [{ url: '' }],
    product: '',
  },
  playlists: [
    {
      id: '',
      item: {},
      name: '',
      index: 0,
      owner: { display_name: '' },
      tracks: { total: '' },
      type: '',
      release_date: '',
      album_type: '',
      images: [{ url: '' }],
      artists: [{ name: '' }],
      albumName: '',
      public: '',
    },
  ],
  recentlyPlayed: [] as any,
  topArtists: [{ images: [{ url: '' }], id: '' }],
  follows: [
    { id: '', images: [{ url: '' }], name: '', followers: { total: 0 } },
  ],
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

export const getUserPlaylistsAsync = createAsyncThunk<
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
      state.data = payload
    })
    builder.addCase(getUserPlaylistsAsync.fulfilled, (state, { payload }) => {
      state.playlists = payload.items
    })
    builder.addCase(
      getUserRecentlyPlayedAsync.fulfilled,
      (state, { payload }) => {
        state.recentlyPlayed = payload.items.map((item: any) => {
          const trackName = item.track.name
          const albumName = item.track.album.name
          return { ...item.track.album, name: trackName, albumName }
        })
      }
    )
    builder.addCase(getUserTopArtistsAsync.fulfilled, (state, { payload }) => {
      state.topArtists = payload.items
    })
    builder.addCase(getUserFollowsAsync.fulfilled, (state, { payload }) => {
      state.follows = payload.artists.items
    })
  },
})

export default userSlice.reducer
