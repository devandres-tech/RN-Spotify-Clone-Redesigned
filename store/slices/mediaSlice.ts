import { BASE_URL } from '@env'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../index'

import { setHeaders } from '../../utils/helpers'

const initialState = {
  isLoading: true,
  name: '',
  description: '',
  tracks: {
    items: [
      {
        id: '',
        artists: [{ name: '' }],
        preview_url: '',
        name: '',
        explicit: false,
        album: { name: '', images: [{ url: '' }] },
        duration_ms: 0,
      },
    ],
  },
  type: '',
  images: [{ url: '' }],
  followers: { total: 0 },
  error: {},
}

export const getAlbumTracksAsync = createAsyncThunk<
  any,
  string,
  { state: RootState; rejectValue: any }
>('media/getAlbumTracks', async (albumId, { getState, rejectWithValue }) => {
  const accessToken = getState().auth.accessToken
  try {
    const response = await fetch(`${BASE_URL}/albums/${albumId}`, {
      method: 'GET',
      headers: setHeaders(accessToken),
    })
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getPlaylistTracksAsync = createAsyncThunk<
  any,
  string,
  { state: RootState; rejectValue: any }
>(
  'media/getPlaylistTracks',
  async (playlistId, { getState, rejectWithValue }) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
        method: 'GET',
        headers: setHeaders(accessToken),
      })
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getArtistTracksAsync = createAsyncThunk<
  any,
  string,
  { state: RootState; rejectValue: any }
>('media/getArtistTracks', async (artistId, { getState, rejectWithValue }) => {
  const accessToken = getState().auth.accessToken
  try {
    const response = await fetch(
      `${BASE_URL}/artists/${artistId}/top-tracks?market=US`,
      {
        method: 'GET',
        headers: setHeaders(accessToken),
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

// TODO: REFACTORING MEDIA SLICE
const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setTrack: (state, action) => {
      const { track } = action.payload
      return { ...track, tracks: { items: [track] } }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbumTracksAsync.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAlbumTracksAsync.fulfilled, (state, { payload }) => {
      const filteredTracks = payload.tracks.items.filter(
        (track: { preview_url: string | null }) => track.preview_url !== null
      )
      payload.tracks.items = filteredTracks
      return { ...payload, followers: { total: 0 }, isLoading: false }
    })
    builder.addCase(getPlaylistTracksAsync.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPlaylistTracksAsync.fulfilled, (state, { payload }) => {
      const flattenPlaylistTracks = payload.tracks.items.map(
        (track: { track: any }) => {
          return { ...track, ...track.track }
        }
      )
      payload.tracks.items = flattenPlaylistTracks.filter(
        (track: { preview_url: null }) => track.preview_url !== null
      )
      return { ...payload, isLoading: false }
    })
    builder.addCase(getArtistTracksAsync.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getArtistTracksAsync.fulfilled, (state, { payload }) => {
      const flattenArtistTracks = payload.tracks.map(
        (track: { track: any }) => {
          return { ...track, ...track.track }
        }
      )
      payload.tracks.items = flattenArtistTracks.filter(
        (track: { preview_url: null }) => track.preview_url !== null
      )
      return { ...initialState, ...payload, isLoading: false }
    })
  },
})

export const { setTrack } = mediaSlice.actions

export default mediaSlice.reducer
