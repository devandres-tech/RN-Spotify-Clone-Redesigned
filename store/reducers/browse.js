import {
  GET_BROWSE_CATEGORIES,
  GET_BROWSE_CATEGORIES_PLAYLISTS,
} from '../actions/browse'

const initialState = {
  categories: [],
  toplists: [{ description: '', images: [{ url: '' }] }],
  hiphop: [{ description: '', images: [{ url: '' }] }],
  pop: [{ description: '', images: [{ url: '' }] }],
  country: [{ description: '', images: [{ url: '' }] }],
  rock: [{ description: '', images: [{ url: '' }] }],
  latin: [{ description: '', images: [{ url: '' }] }],
  in_the_car: [{ description: '', images: [{ url: '' }] }],
  regional_mexican: [{ description: '', images: [{ url: '' }] }],
  mood: [{ description: '', images: [{ url: '' }] }],
  equal: [{ description: '', images: [{ url: '' }] }],
  at_home: [{ description: '', images: [{ url: '' }] }],
  pride: [{ description: '', images: [{ url: '' }] }],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BROWSE_CATEGORIES:
      return {
        ...state,
        categories: action.browseCategories,
      }

    case GET_BROWSE_CATEGORIES_PLAYLISTS:
      return {
        ...state,
        [action.category]: action.items,
      }

    default:
      return state
  }
}
