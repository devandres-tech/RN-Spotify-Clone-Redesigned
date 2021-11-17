import { BASE_URL } from '@env'
import { CATEGORY_ITEMS } from '../../constants'

export const GET_BROWSE_CATEGORIES = 'GET_BROWSE_CATEGORIES'
export const GET_BROWSE_CATEGORIES_PLAYLISTS = 'GET_BROWSE_CATEGORIES_PLAYLISTS'

const setHeaders = (accessToken) => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
}

export const getBrowseCategories = () => {
  return async (dispatch) => {
    dispatch({ type: GET_BROWSE_CATEGORIES, browseCategories: CATEGORY_ITEMS })
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
