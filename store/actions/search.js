import { BASE_URL } from '@env'

export const GET_SEARCH_ITEM = 'GET_SEARCH_ITEM'
export const GET_SEARCH_ITEM_LOADING = 'GET_SEARCH_ITEM_LOADING'

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

    dispatch({ type: GET_SEARCH_ITEM_LOADING, isLoading: true })
    try {
      const response = await fetch(
        `${BASE_URL}/search?q=${encodedSearchQuery}&type=track%2Cartist%2Calbum%2Cplaylist&limit=5`,
        {
          method: 'GET',
          headers: setHeaders(accessToken),
        }
      )
      const data = await response.json()
      dispatch({ type: GET_SEARCH_ITEM, searchResults: data, isLoading: false })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
