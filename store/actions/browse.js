import { BASE_URL } from '@env'

export const GET_BROWSE_CATEGORIES = 'GET_BROWSE_CATEGORIES'

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
