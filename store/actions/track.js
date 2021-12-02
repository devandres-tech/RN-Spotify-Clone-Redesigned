import { BASE_URL } from '@env'

export const GET_ALBUM_TRACKS = 'GET_ALBUM_TRACKS'
export const GET_PLAYLIST_TRACKS = 'GET_PLAYLIST_TRACKS'
export const GET_ARTIST_TRACKS = 'GET_ARTIST_TRACKS'
export const SET_TRACK = 'SET_TRACK'

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
      const filteredTracks = data.tracks.items.filter(
        (track) => track.preview_url !== null
      )
      data.tracks.items = filteredTracks
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
      data.tracks.items = flattenPlaylistTracks.filter(
        (track) => track.preview_url !== null
      )
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
        `${BASE_URL}/artists/${artistId}/top-tracks?market=US`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const data = await response.json()
      const filteredTracks = data.tracks.filter(
        (track) => track.preview_url !== null
      )
      const transformedData = {
        type: 'artist',
        tracks: {
          items: [...filteredTracks],
        },
      }
      dispatch({ type: GET_ARTIST_TRACKS, artistTracks: transformedData })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}

export const setTrack = (track) => {
  return async (dispatch) => {
    const transformedData = {
      ...track,
      tracks: {
        items: [track],
      },
    }
    console.log('tranfordata', transformedData)
    dispatch({ type: SET_TRACK, transformedData })
  }
}
