import { BASE_URL } from '@env'

export const GET_ALBUM_TRACKS = 'GET_ALBUM_TRACKS'
export const GET_PLAYLIST_TRACKS = 'GET_PLAYLIST_TRACKS'

const setHeaders = (accessToken) => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
}

export const getAlbumTracks = (albumId) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(`${BASE_URL}/albums/${albumId}`, {
        method: 'GET',
        headers: setHeaders(accessToken),
      })
      const data = await response.json()
      dispatch({ type: GET_ALBUM_TRACKS, albumTracks: data })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const getPlaylistTracks = (playlistId) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
        method: 'GET',
        headers: setHeaders(accessToken),
      })
      const data = await response.json()
      const flattenPlaylistTracks = data.tracks.items.map((track) => {
        return { ...track, ...track.track }
      })
      data.tracks.items = flattenPlaylistTracks
      dispatch({ type: GET_PLAYLIST_TRACKS, playlistTracks: data })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}
