import {
  GET_CATEGORIES_PLAYLISTS,
  GET_FEATURED_PLAYLISTS,
  GET_NEW_RELEASES,
  GET_PLAYLIST_TRACKS,
} from '../actions/playlist'

const initialState = {
  topLists: [],
  featured: [{ images: [{ url: '' }] }],
  newReleases: [],
  album: {
    tracks: { items: [] },
    images: [{ url: '' }],
    followers: { total: 0 },
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_PLAYLISTS:
      return {
        ...state,
        topLists: action.topLists,
      }

    case GET_FEATURED_PLAYLISTS:
      return {
        ...state,
        featured: action.featured,
      }

    case GET_NEW_RELEASES:
      return {
        ...state,
        newReleases: action.newReleases,
      }

    case GET_PLAYLIST_TRACKS:
      return {
        ...state,
        album: action.playlistTracks,
      }

    default:
      return state
  }
}
