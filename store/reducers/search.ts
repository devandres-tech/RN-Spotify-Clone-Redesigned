import { AnyAction } from 'redux'

import { GET_SEARCH_ITEM, GET_SEARCH_ITEM_LOADING } from '../actions/search'

type searchItem = {
  items: Array<{
    name: string
    images: undefined | []
    artists: Array<{ name: string }>
  }>
}

interface SearchState {
  isLoading: boolean
  results: {
    artists: searchItem
    albums: searchItem
    tracks: {
      items: Array<{
        name: string
        album: undefined | []
        artists: Array<{ name: string }>
      }>
    }
    playlists: searchItem
  }
}

const initialState: SearchState = {
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
}

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_SEARCH_ITEM:
      return {
        ...state,
        results: action.searchResults,
        isLoading: action.isLoading,
      }

    case GET_SEARCH_ITEM_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}
