import {
  GET_ALBUM_TRACKS,
  GET_PLAYLIST_TRACKS,
  GET_ARTIST_TRACKS,
  SET_TRACK,
} from '../actions/track'

const initialState = {
  isLoading: true,
  name: '',
  tracks: {
    items: [{ explicit: false, album: { images: [{ url: '' }] }, artists: [] }],
  },
  type: '',
  images: [{ url: '' }],
  followers: { total: 0 },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUM_TRACKS:
      return {
        ...state,
        ...action.albumTracks,
        isLoading: action.isLoading,
      }

    case GET_PLAYLIST_TRACKS:
      return {
        ...state,
        ...action.playlistTracks,
        isLoading: action.isLoading,
      }

    case GET_ARTIST_TRACKS:
      return {
        ...state,
        ...action.artistTracks,
        isLoading: action.isLoading,
      }

    case SET_TRACK:
      return {
        ...state,
        ...action.transformedData,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}
