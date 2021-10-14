import { BASE_URL } from '@env'

export const USER_PROFILE = 'USER_PROFILE'

export const getProfile = () => {
  return async (dispatch, getState) => {
    const accessToken = getState().user.accessToken
    try {
      const response = await fetch(`${BASE_URL}/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log('respones', response)
      dispatch({ type: USER_PROFILE, data: response })
    } catch (error) {
      console.log('error', error)
    }
  }
}
