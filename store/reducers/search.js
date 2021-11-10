import { GET_SEARCH_ITEM } from '../actions/search'

const initialState = {
  tracks: { items: [] },
  artists: { items: [] },
  albums: { items: [] },
  playlists: { items: [] },
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
