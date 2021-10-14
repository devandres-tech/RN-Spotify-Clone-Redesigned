import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'

import user from './reducers/user'
import auth from './reducers/auth'

const rootReducer = combineReducers({
  user,
  auth,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
