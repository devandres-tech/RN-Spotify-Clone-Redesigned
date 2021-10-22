import { BASE_URL } from '@env'

export const GET_LIBRARY_TOP_ARTISTS = 'GET_LIBRARY_TOP_ARTISTS'

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
      console.log(data)
      dispatch({ type: GET_LIBRARY_TOP_ARTISTS, topArtists: data.items })
    } catch (error) {
      console.log('error')
      throw error
    }
  }
}
