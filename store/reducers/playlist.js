import {
  GET_CATEGORIES_PLAYLISTS,
  GET_FEATURED_PLAYLISTS,
} from '../actions/playlist'

const initialState = {
  topLists: [],
  featured: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_PLAYLISTS:
      return {
        ...state,
        topLists: action.topLists,
      }

    case GET_FEATURED_PLAYLISTS:
      return {
        ...state,
        featured: action.featured,
      }

    default:
      return state
  }
}
