import { createSlice } from '@reduxjs/toolkit'
import { CATEGORY_ITEMS } from '../../constants'

const initialState = {
  categories: [{ id: '', name: '', description: '', images: [{ url: '' }] }],
  toplists: [{ description: '', images: [{ url: '' }] }],
  hiphop: [{ description: '', images: [{ url: '' }] }],
  pop: [{ description: '', images: [{ url: '' }] }],
  country: [{ description: '', images: [{ url: '' }] }],
  rock: [{ description: '', images: [{ url: '' }] }],
}

const browseSlice = createSlice({
  name: 'browse',
  initialState,
  reducers: {
    getBrowseCategories: (state) => {
      state.categories = CATEGORY_ITEMS
    },
  },
})

export const { getBrowseCategories } = browseSlice.actions

export default browseSlice.reducer
