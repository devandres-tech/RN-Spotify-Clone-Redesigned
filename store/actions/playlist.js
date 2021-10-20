import { BASE_URL } from '@env'

export const GET_CATEGORIES_PLAYLISTS = 'GET_CATEGORIES_PLAYLISTS'
export const GET_FEATURED_PLAYLISTS = 'GET_FEATURED_PLAYLISTS'

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
      const {
        playlists: { items },
      } = await response.json()
      dispatch({ type: GET_CATEGORIES_PLAYLISTS, topLists: items })
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const getFeaturedPlaylists = (limit) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/browse/featured-playlists?limit=${limit}&country=US`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const {
        playlists: { items },
      } = await response.json()
      console.log('featuredPlaylists', items)
      dispatch({ type: GET_FEATURED_PLAYLISTS, featured: items })
    } catch (error) {
      console.log('Error', error)
    }
  }
}
