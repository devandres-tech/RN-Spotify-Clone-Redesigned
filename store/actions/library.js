import { BASE_URL } from '@env'

export const GET_LIBRARY_TOP_ARTISTS = 'GET_LIBRARY_TOP_ARTISTS'
export const GET_LIBRARY_TOP_TRACKS = 'GET_LIBRARY_TOP_TRACKS'

const setHeaders = (accessToken) => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
}

export const getTopArtists = () => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/me/top/artists?time_range=long_term&limit=10`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const data = await response.json()
      dispatch({ type: GET_LIBRARY_TOP_ARTISTS, topArtists: data.items })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}

export const getTopTracks = () => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/me/top/tracks?time_range=long_term&limit=10`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )

      const data = await response.json()
      const albums = data.items.map((item) => {
        const trackName = item.name
        const albumName = item.album.name
        const id = item.id
        return { ...item.album, name: trackName, albumName, id }
      })
      dispatch({ type: GET_LIBRARY_TOP_TRACKS, topTracks: albums })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}
