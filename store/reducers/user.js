import { GET_PLAYLISTS, USER_PROFILE } from '../actions/user'

const initialState = {
  data: {
    display_name: '',
  },
  playlists: [{ id: '', name: '', images: [] }],
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

    default:
      return state
  }
}
