import { BASE_URL } from '@env'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../index'

import { setHeaders } from '../../utils/helpers'

const initialState = {
  isLoading: false,
  name: '',
  tracks: {
    items: [{ explicit: false, album: { images: [{ url: '' }] }, artists: [] }],
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
>('track/getAlbumTracks', async (albumId, { getState, rejectWithValue }) => {
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
  'track/getPlaylistTracks',
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
>('track/getArtistTracks', async (artistId, { getState, rejectWithValue }) => {
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

const trackSlice = createSlice({
  name: 'track',
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
      const filteredTracks = payload.data.tracks.items.filter(
        (track: { preview_url: string | null }) => track.preview_url !== null
      )
      payload.data.tracks.items = filteredTracks
      return { ...payload.data, isLoading: false }
    })
    builder.addCase(getPlaylistTracksAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getPlaylistTracksAsync.fulfilled, (state, action) => {
      const { data } = action.payload
      const flattenPlaylistTracks = data.tracks.items.map(
        (track: { track: any }) => {
          return { ...track, ...track.track }
        }
      )
      data.tracks.items = flattenPlaylistTracks.filter(
        (track: { preview_url: null }) => track.preview_url !== null
      )
      return { ...data, isLoading: false }
    })
    builder.addCase(getArtistTracksAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getArtistTracksAsync.fulfilled, (state, action) => {
      const { data } = action.payload
      const flattenPlaylistTracks = data.tracks.items.map(
        (track: { track: any }) => {
          return { ...track, ...track.track }
        }
      )
      data.tracks.items = flattenPlaylistTracks.filter(
        (track: { preview_url: null }) => track.preview_url !== null
      )
      return { ...data, isLoading: false }
    })
  },
})

export const { setTrack } = trackSlice.actions

export default trackSlice.reducer
