import {
  GET_LIBRARY_TOP_ARTISTS,
  GET_LIBRARY_TOP_TRACKS,
} from '../actions/library'

const initialState = {
  topArtists: [],
  topTracks: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIBRARY_TOP_ARTISTS:
      return {
        ...state,
        topArtists: action.topArtists,
      }

    case GET_LIBRARY_TOP_TRACKS:
      return {
        ...state,
        topTracks: action.topTracks,
      }

    default:
      return state
  }
}
