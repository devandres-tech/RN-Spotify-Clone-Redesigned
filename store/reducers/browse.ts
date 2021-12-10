import { AnyAction } from 'redux'

import {
  GET_BROWSE_CATEGORIES,
  GET_BROWSE_CATEGORIES_PLAYLISTS,
} from '../actions/browse'

interface BrowseState {
  categories: []
  toplists: Array<{ description: string; images: Array<{ url: string }> }>
  hiphop: Array<{ description: string; images: Array<{ url: string }> }>
  pop: Array<{ description: string; images: Array<{ url: string }> }>
  country: Array<{ description: string; images: Array<{ url: string }> }>
  rock: Array<{ description: string; images: Array<{ url: string }> }>
}

const initialState: BrowseState = {
  categories: [],
  toplists: [{ description: '', images: [{ url: '' }] }],
  hiphop: [{ description: '', images: [{ url: '' }] }],
  pop: [{ description: '', images: [{ url: '' }] }],
  country: [{ description: '', images: [{ url: '' }] }],
  rock: [{ description: '', images: [{ url: '' }] }],
}

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_BROWSE_CATEGORIES:
      return {
        ...state,
        categories: action.browseCategories,
      }

    case GET_BROWSE_CATEGORIES_PLAYLISTS:
      return {
        ...state,
        [action.category]: action.items,
      }

    default:
      return state
  }
}
