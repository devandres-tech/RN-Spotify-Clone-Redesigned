import {
  GET_USER_PLAYLISTS,
  GET_USER_PROFILE,
  GET_USER_RECENTLY_PLAYED,
  GET_USER_TOP_ARTISTS,
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
    case GET_USER_PROFILE:
      return {
        ...state,
        data: action.data,
      }

    case GET_USER_PLAYLISTS:
      return { ...state, playlists: action.playlists }

    case GET_USER_RECENTLY_PLAYED: {
      return { ...state, recentlyPlayed: action.recentlyPlayed }
    }

    case GET_USER_TOP_ARTISTS: {
      return { ...state, topArtists: action.topArtists }
    }

    default:
      return state
  }
}
