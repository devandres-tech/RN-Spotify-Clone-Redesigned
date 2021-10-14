import { AUTHENTICATE } from '../actions/user'

const initialState = {
  accessToken: null,
  refreshToken: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      }

    default:
      return state
  }
}
