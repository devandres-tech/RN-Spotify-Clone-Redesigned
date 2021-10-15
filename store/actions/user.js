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
      // if (!response.ok) {
      //   const {
      //     error: { message },
      //   } = await response.json()
      //   throw message
      // }
      const data = await response.json()

      dispatch({ type: USER_PROFILE, data })
    } catch (error) {
      console.log('error', error)
    }
  }
}
