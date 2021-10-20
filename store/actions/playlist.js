import { BASE_URL } from '@env'

export const GET_CATEGORIES_PLAYLIST = 'GET_CATEGORIES_PLAYLIST'

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
      const { items } = await response.json()
      dispatch({ type: GET_CATEGORIES_PLAYLIST, topLists: items })
    } catch (error) {
      console.log('Error', error)
    }
  }
}
