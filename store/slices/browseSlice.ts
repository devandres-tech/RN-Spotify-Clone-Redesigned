import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CATEGORY_ITEMS } from '../../constants'
import { BASE_URL } from '@env'

import { setHeaders } from '../../utils/helpers'
import { RootState } from '../index'

const initialState = {
  categories: [{ id: '', name: '', description: '', images: [{ url: '' }] }],
  toplists: [{ description: '', images: [{ url: '' }] }],
  hiphop: [{ description: '', images: [{ url: '' }] }],
  pop: [{ description: '', images: [{ url: '' }] }],
  country: [{ description: '', images: [{ url: '' }] }],
  rock: [{ description: '', images: [{ url: '' }] }],
}

export const getBrowseCategoriesPlaylistsAsync = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(
  'browse/getCategories',
  async (
    args: { limit: string; id: string },
    { getState, rejectWithValue }
  ) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/browse/categories/${args.id}/playlists?limit=${args.limit}`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const data = await response.json()
      return { items: data.playlists.items, category: args.id }
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const browseSlice = createSlice({
  name: 'browse',
  initialState,
  reducers: {
    getBrowseCategories: (state) => {
      state.categories = CATEGORY_ITEMS
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getBrowseCategoriesPlaylistsAsync.fulfilled,
      (state, action) => {
        return {
          ...state,
          [action.payload.category]: action.payload.items,
        }
      }
    )
  },
})

export const { getBrowseCategories } = browseSlice.actions

export default browseSlice.reducer
