import { BASE_URL } from '@env'

export const USER_PROFILE = 'USER_PROFILE'
export const GET_PLAYLISTS = 'GET_PLAYLISTS'
export const GET_RECENTLY_PLAYED = 'GET_RECENTLY_PLAYED'

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

      dispatch({ type: USER_PROFILE, data })
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
      dispatch({ type: GET_PLAYLISTS, playlists: data.items })
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
      data.items.forEach((item) =>
        console.log('------', item.track.album.artists[0].name)
      )
      dispatch({ type: GET_RECENTLY_PLAYED, recentlyPlayed: data.items })
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
}