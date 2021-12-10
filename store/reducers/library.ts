import { AnyAction } from 'redux'

import {
  GET_LIBRARY_TOP_ARTISTS,
  GET_LIBRARY_TOP_TRACKS,
  GET_LIBRARY_USER_TRACKS,
  GET_LIBRARY_USER_ALBUMS,
} from '../actions/library'

const initialState = {
  topArtists: [],
  topTracks: [],
  userTracks: [],
  userAlbums: [],
}

export default (state = initialState, action: AnyAction) => {
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

    case GET_LIBRARY_USER_TRACKS:
      return {
        ...state,
        userTracks: action.userTracks,
      }

    case GET_LIBRARY_USER_ALBUMS:
      return {
        ...state,
        userAlbums: action.userAlbums,
      }

    default:
      return state
  }
}
