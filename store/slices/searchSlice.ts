import { BASE_URL } from '@env'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../index'

import { setHeaders } from '../../utils/helpers'

// id, type, album, preview_url, duration_ms

const initialState = {
  isLoading: true,
  results: {
    artists: {
      items: [
        {
          name: '',
          images: [{ url: '' }],
          artists: [{ name: '' }],
          id: '',
          album: { images: [{ url: '' }], name: '' },
          preview_url: '',
          duration_ms: 0,
          type: '',
        },
      ],
    },
    albums: {
      items: [
        {
          name: '',
          images: [{ url: '' }],
          artists: [{ name: '' }],
          id: '',
          album: { images: [{ url: '' }], name: '' },
          preview_url: '',
          duration_ms: 0,
          type: '',
        },
      ],
    },
    tracks: {
      items: [
        {
          name: '',
          images: [{ url: '' }],
          artists: [{ name: '' }],
          id: '',
          album: { images: [{ url: '' }], name: '' },
          preview_url: '',
          duration_ms: 0,
          type: '',
        },
      ],
    },
    playlists: {
      items: [
        {
          name: '',
          images: [{ url: '' }],
          artists: [{ name: '' }],
          id: '',
          album: { images: [{ url: '' }], name: '' },
          preview_url: '',
          duration_ms: 0,
          type: '',
        },
      ],
    },
  },
  error: {},
}

export const searchItemsAsync = createAsyncThunk<
  any,
  string,
  { state: RootState }
>('search/searchItems', async (query, { getState, rejectWithValue }) => {
  const accessToken = getState().auth.accessToken
  const encodedSearchQuery = encodeURIComponent(query)
  try {
    const response = await fetch(
      `${BASE_URL}/search?q=${encodedSearchQuery}&type=track%2Cartist%2Calbum%2Cplaylist&limit=5`,
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
    })
  },
})

export default searchSlice.reducer
