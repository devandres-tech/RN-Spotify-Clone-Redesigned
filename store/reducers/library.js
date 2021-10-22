import { GET_LIBRARY_TOP_ARTISTS } from '../actions/library'

const initialState = {
  topArtists: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIBRARY_TOP_ARTISTS:
      return {
        ...state,
        topArtists: action.topArtists,
      }

    default:
      return state
  }
}
