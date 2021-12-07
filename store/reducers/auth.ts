import { AnyAction } from 'redux'

import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_LOADING,
  SET_TOKENS,
  REQUEST_REFRESHED_TOKEN,
} from '../actions/auth'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  tokenIsLoading: boolean
  error?: string | null
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  tokenIsLoading: false,
  error: null,
}

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        tokenIsLoading: action.tokenIsLoading,
      }

    case AUTHENTICATE_FAIL:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        tokenIsLoading: action.tokenIsLoading,
        error: action.error,
      }

    case AUTHENTICATE_LOADING:
      return {
        ...state,
        tokenIsLoading: action.tokenIsLoading,
      }

    case SET_TOKENS:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      }

    case REQUEST_REFRESHED_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      }

    default:
      return state
  }
}
