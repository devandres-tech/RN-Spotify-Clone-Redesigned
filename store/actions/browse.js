import { BASE_URL } from '@env'

export const GET_BROWSE_CATEGORIES = 'GET_BROWSE_CATEGORIES'
export const GET_BROWSE_CATEGORIES_PLAYLISTS = 'GET_BROWSE_CATEGORIES_PLAYLISTS'

const setHeaders = (accessToken) => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
}

export const getBrowseCategories = (limit) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/browse/categories?limit=${limit}`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const {
        categories: { items },
      } = await response.json()
      dispatch({ type: GET_BROWSE_CATEGORIES, browseCategories: items })
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export const getBrowseCategoriesPlaylists = (limit, id) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/browse/categories/${id}/playlists?limit=${limit}`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )

      const data = await response.json()
      console.log('data', data)
      if (data.error) throw 'Invalid request'

      dispatch({
        type: GET_BROWSE_CATEGORIES_PLAYLISTS,
        items: data.playlists.items,
        category: id,
      })
    } catch (error) {
      console.log('Error - ', error)
      throw error
    }
  }
}
