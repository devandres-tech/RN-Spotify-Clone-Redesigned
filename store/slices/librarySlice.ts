import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '@env'

import { setHeaders } from '../../utils/helpers'
import { RootState } from '../index'

const initialState = {
  topArtists: [] as any,
  topTracks: [
    {
      preview_url: '',
      id: '',
      name: '',
      album: {
        name: '',
        images: [{ url: '' }],
      },
      duration_ms: 0,
      artists: [{ name: '' }],
      images: [] as any,
    },
  ],
  userTracks: [
    {
      preview_url: '',
      id: '',
      name: '',
      album: {
        name: '',
        images: [{ url: '' }],
      },
      duration_ms: 0,
      artists: [{ name: '' }],
      images: [] as any,
    },
  ],
  userAlbums: [] as any,
}

export const getTopArtistsAsync = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('library/getTopArtists', async (_, { getState }) => {
  const accessToken = getState().auth.accessToken
  const response = await fetch(
    `${BASE_URL}/me/top/artists?time_range=long_term&limit=10`,
    {
      method: 'GET',
      headers: setHeaders(accessToken),
    }
  )
  const data = await response.json()
  return data
})

export const getTopTracksAsync = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('library/getTopTracks', async (_, { getState }) => {
  const accessToken = getState().auth.accessToken
  const response = await fetch(
    `${BASE_URL}/me/top/tracks?time_range=long_term&limit=10`,
    {
      method: 'GET',
      headers: setHeaders(accessToken),
    }
  )
  const data = await response.json()
  return data
})

export const getUserTracksAsync = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('library/getUserTracks', async (_, { getState }) => {
  const accessToken = getState().auth.accessToken
  const response = await fetch(`${BASE_URL}/me/tracks?limit=20`, {
    method: 'GET',
    headers: setHeaders(accessToken),
  })
  const data = await response.json()
  return data
})

export const getUserAlbumsAsync = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('library/getUserAlbums', async (_, { getState }) => {
  const accessToken = getState().auth.accessToken
  const response = await fetch(`${BASE_URL}/me/albums?limit=20`, {
    method: 'GET',
    headers: setHeaders(accessToken),
  })
  const data = await response.json()
  return data
})

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopArtistsAsync.fulfilled, (state, { payload }) => {
      state.topArtists = payload.items
    })
    builder.addCase(getTopTracksAsync.fulfilled, (state, { payload }) => {
      state.topTracks = payload.items.map((item: any) => {
        const trackName = item.name
        const albumName = item.album.name
        const id = item.id
        return { ...item.album, name: trackName, albumName, id }
      })
    })
    builder.addCase(getUserTracksAsync.fulfilled, (state, { payload }) => {
      state.userTracks = payload.items
        .filter((track: any) => track.preview_url !== null)
        .map((item: any) => {
          const trackName = item.track.name
          const albumName = item.track.album.name
          const id = item.track.id
          return { ...item.track, name: trackName, albumName, id }
        })
    })
    builder.addCase(getUserAlbumsAsync.fulfilled, (state, { payload }) => {
      state.userAlbums = payload.items.map((item: any) => {
        const albumName = item.album.name
        const id = item.album.id
        return { ...item.album, albumName, id }
      })
    })
  },
})

export default librarySlice.reducer
