import { BASE_URL } from '@env'

export const GET_SEARCH_ITEM = 'GET_SEARCH_ITEM'

const setHeaders = (accessToken) => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
}

export const searchItems = (query) => {
  const encodedSearchQuery = encodeURIComponent(query)
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(
        `${BASE_URL}/search?q=${encodedSearchQuery}&type=track%2Cartist%2Calbum%2Cplaylist&limit=15`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const data = await response.json()
      dispatch({ type: GET_SEARCH_ITEM, searchResults: data })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
