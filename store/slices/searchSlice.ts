import { BASE_URL } from '@env'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { setHeaders } from '../../utils/helpers'
import { RootState } from '../index'

const initialState = {
  isLoading: true,
  results: [
    {
      name: '',
      images: [{ url: '' }],
      artists: [{ name: '' }],
      id: '',
      album: { images: [{ url: '' }], name: '' },
      preview_url: '',
      duration_ms: 0,
      type: '',
      followers: { total: 0 },
    },
  ],
}

export const searchItemsAsync = createAsyncThunk<
  any,
  string,
  { state: RootState }
>('search/searchItems', async (query, { getState, rejectWithValue }) => {
  const accessToken = getState().auth.accessToken
  const encodeSearchQuery = encodeURIComponent(query)
  try {
    const response = await fetch(
      `${BASE_URL}/search?q=${encodeSearchQuery}&type=track%2Cartist%2Calbum%2Cplaylist&limit=5`,
      {
        method: 'GET',
        headers: setHeaders(accessToken),
      }
    )
    let data = await response.json()
    if (
      data.albums.items.length <= 0 &&
      data.artists.items.length <= 0 &&
      data.tracks.items.length <= 0 &&
      data.playlists.items.length <= 0
    ) {
      data = null
    }
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchItemsAsync.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(searchItemsAsync.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.results = payload
      state.results = [
        ...payload.artists.items,
        ...payload.albums.items,
        ...payload.tracks.items,
        ...payload.playlists.items,
      ]
    })
  },
})

export default searchSlice.reducer
