import { BASE_URL } from '@env'

export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const GET_USER_PLAYLISTS = 'GET_USER_PLAYLISTS'
export const GET_USER_RECENTLY_PLAYED = 'GET_USER_RECENTLY_PLAYED'
export const GET_USER_TOP_ARTISTS = 'GET_USER_TOP_ARTISTS'
export const GET_USER_FOLLOWS = 'GET_USER_FOLLOWS'

const setHeaders = (accessToken) => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
}

export const getProfile = () => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(`${BASE_URL}/me`, {
        method: 'GET',
        headers: setHeaders(accessToken),
      })
      if (!response.ok) {
        const {
          error: { message },
        } = await response.json()
        throw message
      }
      const data = await response.json()
      dispatch({ type: GET_USER_PROFILE, data })
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const getPlaylists = (limit) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(`${BASE_URL}/me/playlists?limit=${limit}`, {
        method: 'GET',
        headers: setHeaders(accessToken),
      })
      const data = await response.json()
      dispatch({ type: GET_USER_PLAYLISTS, playlists: data.items })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}

export const getRecentlyPlayed = (limit) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/me/player/recently-played?limit=${limit}`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const data = await response.json()
      const albums = data.items.map((item) => {
        const trackName = item.track.name
        const albumName = item.track.album.name
        return { ...item.track.album, name: trackName, albumName }
      })
      dispatch({ type: GET_USER_RECENTLY_PLAYED, recentlyPlayed: albums })
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
}

export const getTopArtists = (time_range, limit) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/me/top/artists?time_range=${time_range}&limit=${limit}`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const data = await response.json()
      dispatch({ type: GET_USER_TOP_ARTISTS, topArtists: data.items })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}

export const getUserFollows = (limit) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/me/following?type=artist&limit=${limit}`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const data = await response.json()
      dispatch({ type: GET_USER_FOLLOWS, follows: data.artists.items })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}
