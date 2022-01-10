import { configureStore } from '@reduxjs/toolkit'
// slices
import audioPlayerReducer from './slices/audioPlayerSlice'
import authReducer from './slices/authSlice'
import browseReducer from './slices/browseSlice'
import libraryReducer from './slices/librarySlice'
import playlistReducer from './slices/playlistSlice'
import searchReducer from './slices/searchSlice'
import trackReducer from './slices/trackSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    auth: authReducer,
    browse: browseReducer,
    library: libraryReducer,
    playlist: playlistReducer,
    search: searchReducer,
    track: trackReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
