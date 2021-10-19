import {
  GET_PLAYLISTS,
  USER_PROFILE,
  GET_RECENTLY_PLAYED,
  GET_TOP_ARTISTS,
} from '../actions/user'

const initialState = {
  data: {
    display_name: '',
  },
  playlists: [{ id: '', name: '', images: [{ url: '' }] }],
  recentlyPlayed: [],
  topArtists: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return {
        ...state,
        data: action.data,
      }

    case GET_PLAYLISTS:
      return { ...state, playlists: action.playlists }

    case GET_RECENTLY_PLAYED: {
      return { ...state, recentlyPlayed: action.recentlyPlayed }
    }

    case GET_TOP_ARTISTS: {
      return { ...state, topArtists: action.topArtists }
    }

    default:
      return state
  }
}
