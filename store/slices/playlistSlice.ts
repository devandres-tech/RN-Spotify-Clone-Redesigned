import { BASE_URL } from '@env'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { setHeaders } from '../../utils/helpers'
import { RootState } from '../index'

const initialState = {
  topLists: [],
  featured: [{ images: undefined }],
  newReleases: [],
  album: {
    tracks: { items: [] },
    images: [{ url: '' }],
    followers: { total: 0 },
    name: '',
  },
}

export const getCategoryPlaylistAsync = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(
  'playlist/getCategoryPlaylist',
  async (args: { categoryId: string; limit: string }, { getState }) => {
    const accessToken = getState().auth.accessToken
    const response = await fetch(
      `${BASE_URL}/browse/categories/${args.categoryId}/playlists?limit=${args.limit}`,
      {
        method: 'GET',
        headers: setHeaders(accessToken),
      }
    )
    const data = await response.json()
    return data
  }
)

export const getFeaturedPlaylistAsync = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(
  'playlist/getFeaturedPlaylist',
  async (args: { limit: string }, { getState }) => {
    const accessToken = getState().auth.accessToken
    const response = await fetch(
      `${BASE_URL}/browse/featured-playlists?limit=${args.limit}&country=US`,
      {
        method: 'GET',
        headers: setHeaders(accessToken),
      }
    )
    const data = await response.json()
    return data
  }
)

export const getNewReleasesAsync = createAsyncThunk<
  any,
  any,
  { state: RootState }
>('playlist/getNewReleases', async (args: { limit: string }, { getState }) => {
  const accessToken = getState().auth.accessToken
  const response = await fetch(
    `${BASE_URL}/browse/new-releases?limit=${args.limit}`,
    {
      method: 'GET',
      headers: setHeaders(accessToken),
    }
  )
  const data = await response.json()
  return data
})

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCategoryPlaylistAsync.fulfilled,
      (state, { payload }) => {
        state.topLists = payload.data.playlists.items
      }
    )
    builder.addCase(
      getFeaturedPlaylistAsync.fulfilled,
      (state, { payload }) => {
        state.featured = payload.data.playlists.items
      }
    )
    builder.addCase(getNewReleasesAsync.fulfilled, (state, { payload }) => {
      state.newReleases = payload.data.albums.items.map((item: any) => {
        const albumName = item.name
        return { ...item, name: albumName, albumName }
      })
    })
  },
})

export default playlistSlice.reducer
