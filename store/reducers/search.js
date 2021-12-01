import { GET_SEARCH_ITEM } from '../actions/search'

const initialState = {
  results: {
    artists: {
      items: [{ name: '', images: undefined, artists: [{ name: '' }] }],
    },
    albums: {
      items: [{ name: '', images: undefined, artists: [{ name: '' }] }],
    },
    tracks: {
      items: [{ name: '', images: undefined, artists: [{ name: '' }] }],
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
      }

    default:
      return state
  }
}
