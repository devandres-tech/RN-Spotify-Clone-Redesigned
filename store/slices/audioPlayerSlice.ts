import TrackPlayer, { Track } from 'react-native-track-player'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { shuffle, formatText } from '../../utils/helpers'
import { RootState } from '../index'

const initialState = {
  isTrackPlaying: false,
  currentTrack: { url: '', id: '', searchTerm: '' },
  tracks: [
    {
      id: '',
      artists: [{ name: '' }],
      preview_url: '',
      name: '',
      album: {
        name: '',
        images: [{ url: '' }],
      },
      duration_ms: 0,
    },
  ],
  isShuffle: false,
  repeat: { one: false, all: false },
}

export const initAsync = createAsyncThunk('audioPlayer/init', async () => {
  await TrackPlayer.setupPlayer({})
})

export const playTrackAsync = createAsyncThunk(
  'audioPlayer/playTrack',
  async () => {
    await TrackPlayer.play()
  }
)

export const pauseTrackAsync = createAsyncThunk(
  'audioPlayer/pauseTrack',
  async () => {
    await TrackPlayer.pause()
  }
)

export const setCurrentTrackAsync = createAsyncThunk(
  'audioPlayer/setCurrentTrack',
  async (currentTrack: Track) => {
    await TrackPlayer.add(currentTrack)
    return currentTrack
  }
)

export const resetPlayerAsync = createAsyncThunk(
  'audioPlayer/resetPlayer',
  async () => {
    await TrackPlayer.reset()
  }
)

export const seekToPositionAsync = createAsyncThunk(
  'audioPlayer/seekToPosition',
  async (position: number) => {
    await TrackPlayer.seekTo(position)
  }
)

export const playNextTrackAsync = createAsyncThunk<
  any,
  any,
  { state: RootState }
>('audioPlayer/playNextTrack', async (_, { dispatch, getState }) => {
  const player = getState().audioPlayer
  const isAlbum = getState().track.type === 'album'
  const lastIndex = player.tracks.length - 1
  const currentTrackIndex = player.tracks.findIndex(
    (track) => track.id === player.currentTrack.id
  )
  let nextTrack
  if (currentTrackIndex === lastIndex) {
    nextTrack = player.tracks[0]
  } else {
    nextTrack = player.tracks[currentTrackIndex + 1]
  }
  const artistsNames = formatText(nextTrack.artists)
  dispatch(resetPlayerAsync())
  dispatch(
    setCurrentTrackAsync({
      id: nextTrack.id,
      url: nextTrack.preview_url,
      title: nextTrack.name,
      artist: artistsNames,
      album: isAlbum ? getState().track.name : nextTrack.album.name,
      genre: '',
      artwork: isAlbum
        ? getState().track.images[0].url
        : nextTrack.album.images[0].url,
      duration: nextTrack.duration_ms,
      searchTerm: player.currentTrack.searchTerm
        ? player.currentTrack.searchTerm
        : '',
    })
  )
  if (currentTrackIndex === lastIndex && !player.repeat.all) {
    dispatch(pauseTrackAsync())
  } else {
    dispatch(playTrackAsync())
  }
})

export const playPrevTrackAsync = createAsyncThunk<
  any,
  any,
  { state: RootState }
>('audioPlayer/playPrevTrack', async (_, { dispatch, getState }) => {
  const player = getState().audioPlayer
  const isAlbum = getState().track.type === 'album'
  const currentTrackIndex = player.tracks.findIndex(
    (track) => track.id === player.currentTrack.id
  )
  let prevTrack
  if (currentTrackIndex < 1) {
    prevTrack = player.tracks[player.tracks.length - 1]
    if (player.repeat.all) {
      const artistsNames = formatText(prevTrack.artists)
      dispatch(resetPlayerAsync())
      dispatch(
        setCurrentTrackAsync({
          id: prevTrack.id,
          url: prevTrack.preview_url,
          title: prevTrack.name,
          artist: artistsNames,
          album: isAlbum ? getState().track.name : prevTrack.album.name,
          genre: '',
          artwork: isAlbum
            ? getState().track.images[0].url
            : prevTrack.album.images[0].url,
          duration: prevTrack.duration_ms,
          searchTerm: player.currentTrack.searchTerm
            ? player.currentTrack.searchTerm
            : '',
        })
      )
      dispatch(playTrackAsync())
    } else {
      TrackPlayer.seekTo(0)
    }
  } else {
    prevTrack = player.tracks[currentTrackIndex - 1]
    const artistsNames = formatText(prevTrack.artists)
    dispatch(resetPlayerAsync())
    dispatch(
      setCurrentTrackAsync({
        id: prevTrack.id,
        url: prevTrack.preview_url,
        title: prevTrack.name,
        artist: artistsNames,
        album: isAlbum ? getState().track.name : prevTrack.album.name,
        genre: '',
        artwork: isAlbum
          ? getState().track.images[0].url
          : prevTrack.album.images[0].url,
        duration: prevTrack.duration_ms,
        searchTerm: player.currentTrack.searchTerm
          ? player.currentTrack.searchTerm
          : '',
      })
    )
    dispatch(playTrackAsync())
  }
})

export const shuffleTracksAsync = createAsyncThunk<
  any,
  any,
  { state: RootState }
>('audioPlayer/shuffleTracks', async (_, { getState }) => {
  const player = getState().audioPlayer
  const currentTrack = player.tracks.find(
    (track) => track.id === player.currentTrack.id
  )
  const filteredTracks = player.tracks.filter(
    (track) => track.id !== currentTrack?.id
  )
  const randomTracks = shuffle(filteredTracks)
  randomTracks.unshift(currentTrack as {})
  return randomTracks
})

export const unShuffleTracksAsync = createAsyncThunk<
  any,
  any,
  { state: RootState }
>('audioPlayer/usShuffleTracks', async (_, { getState }) => {
  const track = getState().track
  const originalTracks =
    track.type === 'track' ? [track] : getState().track.tracks.items
  return originalTracks
})

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setTracks: (state, action) => {
      state.tracks = action.payload.tracks
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
    builder.addCase(playTrackAsync.fulfilled, (state) => {
      state.isTrackPlaying = true
    })
    builder.addCase(pauseTrackAsync.fulfilled, (state) => {
      state.isTrackPlaying = false
    })
    builder.addCase(setCurrentTrackAsync.fulfilled, (state, action) => {
      state.currentTrack = action.payload.currentTrack
    })
    builder.addCase(resetPlayerAsync.fulfilled, () => {})
    builder.addCase(seekToPositionAsync.fulfilled, () => {})
    builder.addCase(playNextTrackAsync.fulfilled, () => {})
    builder.addCase(shuffleTracksAsync.fulfilled, (state, action) => {
      state.tracks = action.payload.randomTracks
    })
    builder.addCase(unShuffleTracksAsync.fulfilled, (state, action) => {
      state.tracks = action.payload.originalTracks
    })
  },
})

export const { setTracks, repeatOne, repeatAll, unsetRepeat } =
  audioPlayerSlice.actions

export default audioPlayerSlice.reducer
