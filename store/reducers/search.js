import { GET_SEARCH_ITEM, GET_SEARCH_ITEM_LOADING } from '../actions/search'

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
}

export default (state = initialState, action) => {
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
