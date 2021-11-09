import { GET_ALBUM_TRACKS, GET_PLAYLIST_TRACKS } from '../actions/track'

const initialState = {
  tracks: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUM_TRACKS:
      return {
        ...state,
        tracks: action.albumTracks,
      }

    case GET_PLAYLIST_TRACKS:
      return {
        ...state,
        tracks: action.playlistTracks,
      }

    default:
      return state
  }
}
