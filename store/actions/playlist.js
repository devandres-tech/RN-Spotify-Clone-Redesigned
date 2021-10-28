import { BASE_URL } from '@env'

export const GET_CATEGORIES_PLAYLISTS = 'GET_CATEGORIES_PLAYLISTS'
export const GET_FEATURED_PLAYLISTS = 'GET_FEATURED_PLAYLISTS'
export const GET_NEW_RELEASES = 'GET_NEW_RELEASES'
export const GET_PLAYLIST_TRACKS = 'GET_PLAYLIST_TRACKS'

const setHeaders = (accessToken) => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
}

export const getCategoryPlaylist = (categoryId, limit) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/browse/categories/${categoryId}/playlists?limit=${limit}`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const {
        playlists: { items },
      } = await response.json()
      dispatch({ type: GET_CATEGORIES_PLAYLISTS, topLists: items })
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const getFeaturedPlaylists = (limit) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/browse/featured-playlists?limit=${limit}&country=US`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const {
        playlists: { items },
      } = await response.json()
      dispatch({ type: GET_FEATURED_PLAYLISTS, featured: items })
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const getNewReleases = (limit) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/browse/new-releases?limit=${limit}`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )

      const data = await response.json()
      const albums = data.albums.items.map((item) => {
        const albumName = item.name
        return { ...item, name: albumName, albumName }
      })

      dispatch({ type: GET_NEW_RELEASES, newReleases: albums })
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const getPlaylistTracks = (playlistId) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/playlists/${playlistId}/tracks`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const data = await response.json()
      const tracks = data.items.map((item) => {
        return item.track
      })
      dispatch({ type: GET_PLAYLIST_TRACKS, tracks })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}
