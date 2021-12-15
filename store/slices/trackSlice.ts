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
  any,
  { state: RootState; rejectValue: any }
>(
  'track/getAlbumTracks',
  async (albumId: string, { getState, rejectWithValue }) => {
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
  }
)

// TODO finish creating playlist, artist, and set track
const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
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
    builder.addCase(getAlbumTracksAsync.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export default trackSlice.reducer
