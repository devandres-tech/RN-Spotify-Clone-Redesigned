import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_LOADING,
} from '../actions/user'

const initialState = {
  accessToken: null,
  refreshToken: null,
  tokenIsLoading: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        tokenIsLoading: action.tokenIsLoading,
      }
    case AUTHENTICATE_FAIL:
      return {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        tokenIsLoading: action.tokenIsLoading,
        error: action.error,
      }
    case AUTHENTICATE_LOADING:
      return {
        tokenIsLoading: action.tokenIsLoading,
      }

    default:
      return state
  }
}
