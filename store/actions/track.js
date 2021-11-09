import { BASE_URL } from '@env'

export const GET_ALBUM_TRACKS = 'GET_ALBUM_TRACKS'
export const GET_PLAYLIST_TRACKS = 'GET_PLAYLIST_TRACKS'
export const GET_ARTIST_TRACKS = 'GET_ARTIST_TRACKS'

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

export const getArtistTracks = (artistId) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/artists/${artistId}/top-tracks`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const data = await response.json()
      console.log('data')
      dispatch({ type: GET_ARTIST_TRACKS, artistTracks: data })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}
