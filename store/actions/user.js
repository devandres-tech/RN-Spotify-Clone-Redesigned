import { BASE_URL } from '@env'

export const USER_PROFILE = 'USER_PROFILE'

export const getProfile = () => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken
    try {
      const response = await fetch(`${BASE_URL}/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const data = await response.json()

      dispatch({ type: USER_PROFILE, data })
    } catch (error) {
      console.log('error', error)
    }
  }
}
