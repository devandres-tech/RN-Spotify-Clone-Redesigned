import { GET_SEARCH_ITEM } from '../actions/search'

const initialState = {
  results: {
    artists: {
      items: [{ name: '', images: [{ url: '' }], artists: [{ name: '' }] }],
    },
    albums: {
      items: [{ name: '', images: [{ url: '' }], artists: [{ name: '' }] }],
    },
    tracks: {
      items: [{ name: '', images: [{ url: '' }], artists: [{ name: '' }] }],
    },
    playlists: {
      items: [{ name: '', images: [{ url: '' }], artists: [{ name: '' }] }],
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
