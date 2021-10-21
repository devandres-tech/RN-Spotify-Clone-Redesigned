import { GET_BROWSE_CATEGORIES } from '../actions/browse'

const initialState = {
  categories: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BROWSE_CATEGORIES:
      return {
        ...state,
        categories: action.browseCategories,
      }

    default:
      return state
  }
}
