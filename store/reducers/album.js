import { GET_ALBUM } from '../actions/album'

const initialState = {
  album: { tracks: { items: [] }, images: [{ url: '' }] },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUM:
      return {
        ...state,
        album: action.album,
      }

    default:
      return state
  }
}
