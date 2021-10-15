import { USER_PROFILE } from '../actions/user'

const initialState = {
  data: {
    display_name: '',
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return {
        data: action.data,
      }

    default:
      return state
  }
}
