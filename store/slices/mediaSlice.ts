import { BASE_URL } from '@env'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../index'

import { setHeaders } from '../../utils/helpers'

const getArtistInfo = async (artistId: string, accessToken: string) => {
  const response = await fetch(`${BASE_URL}/artists/${artistId}`, {
    method: 'GET',
    headers: setHeaders(accessToken),
  })
  const data = await response.json()
  return data
}

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

export const getAlbumsTracksAsync = createAsyncThunk<
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

export const getArtistTracksAsync = createAsyncThunk<
  any,
  string,
  { state: RootState; rejectValue: any }
>('media/getArtistTracks', async (artistId, { getState, rejectWithValue }) => {
  const accessToken = getState().auth.accessToken
  const artistInfo = await getArtistInfo(artistId, accessToken)
  try {
    const response = await fetch(
      `${BASE_URL}/artists/${artistId}/top-tracks?market=US`,
      {
        method: 'GET',
        headers: setHeaders(accessToken),
      }
    )
    const data = await response.json()
    return { ...data, ...artistInfo }
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  isLoading: true,
  name: '',
  description: '',
  type: '',
  release_date: '',
  images: [{ url: '' }],
  followers: { total: 0 },
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
}

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlaylistTracksAsync.fulfilled, (state, { payload }) => {
      const flattenPlaylistTracks = payload.tracks.items.map((track: any) => {
        return { ...track, ...track.track }
      })
      payload.tracks.items = flattenPlaylistTracks.filter(
        (track: any) => track.preview_url !== null
      )
      return { ...payload, isLoading: false }
    })
    builder.addCase(getPlaylistTracksAsync.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAlbumsTracksAsync.fulfilled, (state, { payload }) => {
      const filteredTracks = payload.tracks.items.filter(
        (track: any) => track.preview_url !== null
      )
      payload.tracks.items = filteredTracks
      return { ...payload, followers: { total: 0 }, isLoading: false }
    })
    builder.addCase(getAlbumsTracksAsync.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getArtistTracksAsync.fulfilled, (state, { payload }) => {
      const filteredTracks = payload.tracks.filter(
        (track: any) => track.preview_url !== null
      )
      return {
        ...payload,
        tracks: { items: filteredTracks },
        isLoading: false,
      }
    })
    builder.addCase(getArtistTracksAsync.pending, (state) => {
      state.isLoading = true
    })
  },
})

export default mediaSlice.reducer
