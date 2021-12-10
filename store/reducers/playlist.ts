import { AnyAction } from 'redux'

import {
  GET_CATEGORIES_PLAYLISTS,
  GET_FEATURED_PLAYLISTS,
  GET_NEW_RELEASES,
} from '../actions/playlist'

interface PlaylistState {
  topLists: Array<{}>
  featured: Array<{ images: string | undefined }>
  newReleases: Array<{}>
  album: {
    tracks: { items: Array<{}> }
    images: Array<{ url: string }>
    followers: { total: number }
    name: string
  }
}

const initialState: PlaylistState = {
  topLists: [],
  featured: [{ images: undefined }],
  newReleases: [],
  album: {
    tracks: { items: [] },
    images: [{ url: '' }],
    followers: { total: 0 },
    name: '',
  },
}

export default (state = initialState, action: AnyAction) => {
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

    default:
      return state
  }
}
