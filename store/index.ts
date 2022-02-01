import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import playlistReducer from './slices/playlistSlice'
import browseReducer from './slices/browseSlice'
import searchReducer from './slices/searchSlice'
import libraryReducer from './slices/librarySlice'
import mediaReducer from './slices/mediaSlice'
import trackPlayerReducer from './slices/trackPlayerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    playlist: playlistReducer,
    browse: browseReducer,
    search: searchReducer,
    library: libraryReducer,
    media: mediaReducer,
    trackPlayer: trackPlayerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
