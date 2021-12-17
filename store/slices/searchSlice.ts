import { BASE_URL } from '@env'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../index'

import { setHeaders } from '../../utils/helpers'

const initialState = {
  isLoading: true,
  results: {
    artists: {
      items: [{ name: '', images: undefined, artists: [{ name: '' }] }],
    },
    albums: {
      items: [{ name: '', images: undefined, artists: [{ name: '' }] }],
    },
    tracks: {
      items: [{ name: '', album: undefined, artists: [{ name: '' }] }],
    },
    playlists: {
      items: [{ name: '', images: undefined, artists: [{ name: '' }] }],
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
