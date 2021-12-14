import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import user from './reducers/user'
import auth from './reducers/auth'
import playlist from './reducers/playlist'
import browse from './reducers/browse'
import library from './reducers/library'
import track from './reducers/track'
import search from './reducers/search'
import audioPlayer from './reducers/audioPlayer'

export const store = configureStore({
  reducer: {
    auth,
    // audioPlayer,
    // search,
    // track,
    // user,
    // playlist,
    // browse,
    // library,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

// const rootReducer = combineReducers({
// })

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// )

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
