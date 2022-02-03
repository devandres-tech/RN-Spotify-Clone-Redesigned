import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import TrackPlayer from 'react-native-track-player'

import { RootState } from '../index'
import { shuffle } from '../../utils/helpers'

const initialState = {
  isTrackPlaying: false,
  isShuffle: false,
  repeat: { one: false, all: false },
  searchTerm: '',
  currentTrack: {
    url: '',
    title: '',
    artwork: '',
    artist: '',
    id: '',
  },
  tracks: [] as any,
}

export const initAsync = createAsyncThunk('trackPlayer/init', async () => {
  await TrackPlayer.setupPlayer({})
})

export const setCurrentTrackAsync = createAsyncThunk(
  'trackPlayer/setCurrentTrack',
  async (currentTrack: typeof initialState.currentTrack) => {
    await TrackPlayer.add(currentTrack)
    return currentTrack
  }
)

export const playTrackAsync = createAsyncThunk(
  'trackPlayer/playTrack',
  async () => {
    await TrackPlayer.play()
  }
)

export const pauseTrackAsync = createAsyncThunk(
  'trackPlayer/pauseTrack',
  async () => {
    await TrackPlayer.pause()
  }
)

export const resetPlayerAsync = createAsyncThunk(
  'trackPlayer/resetPlayer',
  async () => {
    await TrackPlayer.reset()
  }
)

export const seekToPositionAsync = createAsyncThunk(
  'trackPlayer/seekToPosition',
  async (position: number) => {
    await TrackPlayer.seekTo(position)
  }
)

export const playNextTrackAsync = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('trackPlayer/playNextTrack', async (_, { dispatch, getState }) => {
  const trackPlayer = getState().trackPlayer
  const media = getState().media
  const isAlbum = getState().media.type === 'album'
  const lastIndex = trackPlayer.tracks.length - 1
  const currentTrackIndex = trackPlayer.tracks.findIndex(
    (track: any) => track.id === trackPlayer.currentTrack.id
  )
  let nextTrack
  if (currentTrackIndex === lastIndex) {
    nextTrack = trackPlayer.tracks[0]
  } else {
    nextTrack = trackPlayer.tracks[currentTrackIndex + 1]
  }
  dispatch(resetPlayerAsync())
  dispatch(
    setCurrentTrackAsync({
      id: nextTrack.id,
      url: nextTrack.preview_url,
      title: nextTrack.name,
      artist: nextTrack.artists.map((artist: any) => artist.name).join(', '),
      artwork: isAlbum ? media.images[0].url : nextTrack.album.images[0].url,
    })
  )
  if (currentTrackIndex === lastIndex && !trackPlayer.repeat.all) {
    dispatch(pauseTrackAsync())
  } else {
    dispatch(playTrackAsync())
  }
})

export const playPrevTrackAsync = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('trackPlayer/playPrevTrack', async (_, { dispatch, getState }) => {
  const trackPlayer = getState().trackPlayer
  const media = getState().media
  const isAlbum = getState().media.type === 'album'
  const currentTrackIndex = trackPlayer.tracks.findIndex(
    (track: any) => track.id === trackPlayer.currentTrack.id
  )
  let prevTrack
  if (currentTrackIndex < 1) {
    prevTrack = trackPlayer.tracks[trackPlayer.tracks.length - 1]
  } else {
    prevTrack = trackPlayer.tracks[currentTrackIndex - 1]
  }
  if (currentTrackIndex < 1 && !trackPlayer.repeat.all) {
    dispatch(seekToPositionAsync(0))
  } else {
    dispatch(resetPlayerAsync())
    dispatch(
      setCurrentTrackAsync({
        id: prevTrack.id,
        url: prevTrack.preview_url,
        title: prevTrack.name,
        artist: prevTrack.artists.map((artist: any) => artist.name).join(', '),
        artwork: isAlbum ? media.images[0].url : prevTrack.album.images[0].url,
      })
    )
    dispatch(playTrackAsync())
  }
})

export const shuffleTracksAsync = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('trackPlayer/shuffleTracks', async (_, { getState }) => {
  const trackPlayer = getState().trackPlayer
  const currentTrack = trackPlayer.tracks.find(
    (track: any) => track.id === trackPlayer.currentTrack.id
  )
  const filteredTracks = trackPlayer.tracks.filter(
    (track: any) => track.id !== currentTrack.id
  )
  const randomTracks = shuffle(filteredTracks)
  randomTracks.unshift(currentTrack)
  return randomTracks
})

export const unShuffleTracksAsync = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('trackPlayer/unShuffleTracks', (_, { getState }) => {
  const originalTracks = getState().media.tracks.items
  return originalTracks
})

const trackPlayerSlice = createSlice({
  name: 'trackPlayer',
  initialState,
  reducers: {
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload
    },
    setTracks: (state, { payload }) => {
      state.tracks = payload
    },
    repeatOne: (state) => {
      state.repeat = { one: true, all: false }
    },
    repeatAll: (state) => {
      state.repeat = { one: false, all: true }
    },
    unsetRepeat: (state) => {
      state.repeat = { one: false, all: false }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initAsync.fulfilled, () => {})
    builder.addCase(setCurrentTrackAsync.fulfilled, (state, { payload }) => {
      state.currentTrack = payload
    })
    builder.addCase(playTrackAsync.fulfilled, (state) => {
      state.isTrackPlaying = true
    })
    builder.addCase(pauseTrackAsync.fulfilled, (state) => {
      state.isTrackPlaying = false
    })
    builder.addCase(seekToPositionAsync.fulfilled, (state) => {})
    builder.addCase(shuffleTracksAsync.fulfilled, (state, { payload }) => {
      state.tracks = payload
      state.isShuffle = true
    })
    builder.addCase(unShuffleTracksAsync.fulfilled, (state, { payload }) => {
      state.tracks = payload
      state.isShuffle = false
    })
  },
})

export const { setSearchTerm, setTracks, repeatOne, repeatAll, unsetRepeat } =
  trackPlayerSlice.actions

export default trackPlayerSlice.reducer
