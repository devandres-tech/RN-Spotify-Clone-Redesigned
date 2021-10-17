import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_LOADING,
  SET_TOKENS,
  REQUEST_REFRESHED_TOKEN,
} from '../actions/auth'

// const getTokensFromAsyncStorage = async () => {
//   const authData = await AsyncStorage.getItem('authData')
//   const { accessToken, refreshToken, accessTokenExpirationDate } =
//     await JSON.parse(authData)
//   console.log('AUTH.REDUX STORE', accessToken, refreshToken)
//   return {
//     accessToken,
//     refreshToken,
//     accessTokenExpirationDate,
//   }
// }
// console.log(getTokensFromAsyncStorage())

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

    case SET_TOKENS:
      return {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      }

    case REQUEST_REFRESHED_TOKEN:
      return {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      }

    default:
      return state
  }
}