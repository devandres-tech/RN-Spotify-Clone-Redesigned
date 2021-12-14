import { BASE_URL } from '@env'
import { Dispatch } from 'redux'

export const GET_LIBRARY_TOP_ARTISTS = 'GET_LIBRARY_TOP_ARTISTS'
export const GET_LIBRARY_TOP_TRACKS = 'GET_LIBRARY_TOP_TRACKS'
export const GET_LIBRARY_USER_TRACKS = 'GET_LIBRARY_USER_TRACKS'
export const GET_LIBRARY_USER_ALBUMS = 'GET_LIBRARY_USER_ALBUMS'

const setHeaders = (accessToken: string) => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
}

export const getTopArtists = () => {
  return async (dispatch: Dispatch, getState: any) => {
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
  return async (dispatch: Dispatch, getState: any) => {
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
      const albums = data.items.map((item: any) => {
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

export const getUserTracks = () => {
  return async (dispatch: Dispatch, getState: any) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(`${BASE_URL}/me/tracks?limit=20`, {
        method: 'GET',
        headers: setHeaders(accessToken),
      })

      const data = await response.json()
      const albums = data.items.map((item: any) => {
        const trackName = item.track.name
        const albumName = item.track.album.name
        const id = item.track.id
        return { ...item.track, name: trackName, albumName, id }
      })
      dispatch({ type: GET_LIBRARY_USER_TRACKS, userTracks: albums })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}

export const getUserAlbums = () => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(`${BASE_URL}/me/albums?limit=20`, {
        method: 'GET',
        headers: setHeaders(accessToken),
      })

      const data = await response.json()
      const albums = data.items.map((item) => {
        const albumName = item.album.name
        const id = item.album.id
        return { ...item.album, albumName, id }
      })
      dispatch({ type: GET_LIBRARY_USER_ALBUMS, userAlbums: albums })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}
