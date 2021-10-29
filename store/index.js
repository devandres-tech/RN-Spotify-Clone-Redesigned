import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import user from './reducers/user'
import auth from './reducers/auth'
import playlist from './reducers/playlist'
import browse from './reducers/browse'
import library from './reducers/library'
import album from './reducers/album'

const rootReducer = combineReducers({
  album,
  user,
  auth,
  playlist,
  browse,
  library,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
