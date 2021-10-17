import {
  GET_PLAYLISTS,
  USER_PROFILE,
  GET_RECENTLY_PLAYED,
} from '../actions/user'

const initialState = {
  data: {
    display_name: '',
  },
  playlists: [{ id: '', name: '', images: [{ url: '' }] }],
  recentlyPlayed: [],
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

    default:
      return state
  }
}
