import { BASE_URL } from '@env'

export const GET_ALBUM = 'GET_ALBUM'

const setHeaders = (accessToken) => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
}

export const getAlbum = (albumId) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(`${BASE_URL}/albums/${albumId}`, {
        method: 'GET',
        headers: setHeaders(accessToken),
      })
      const data = await response.json()
      // console.log('ALUMS', data)
      dispatch({ type: GET_ALBUM, album: data })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
