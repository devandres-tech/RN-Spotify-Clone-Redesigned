import TrackPlayer from 'react-native-track-player'

export const PLAY_TRACK = 'PLAY_TRACK'
export const PAUSE_TRACK = 'PAUSE_TRACK'
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK'
export const RESET_PLAYER = 'RESET_PLAYER'
export const INIT_PLAYER = 'INIT_PLAYER'
export const SEEK_TO_POSITION = 'SEEK_TO_POSITION'
export const SET_TRACKS = 'SET_TRACKS'
export const SHUFFLE_TRACKS = 'SHUFFLE_TRACKS'

export const init = () => {
  return async (dispatch) => {
    await TrackPlayer.setupPlayer({})
    dispatch({ type: INIT_PLAYER })
  }
}

export const playTrack = () => {
  return async (dispatch) => {
    await TrackPlayer.play()
    dispatch({ type: PLAY_TRACK, isTrackPlaying: true })
  }
}

export const pauseTrack = () => {
  return async (dispatch) => {
    await TrackPlayer.pause()
    dispatch({ type: PAUSE_TRACK, isTrackPlaying: false })
  }
}

export const setCurrentTrack = (currentTrack) => {
  return async (dispatch) => {
    await TrackPlayer.add(currentTrack)
    dispatch({ type: SET_CURRENT_TRACK, currentTrack })
  }
}

export const setTracks = (tracks) => {
  return async (dispatch) => {
    dispatch({ type: SET_TRACKS, tracks })
  }
}

export const resetPlayer = () => {
  return async (dispatch) => {
    await TrackPlayer.reset()
    dispatch({ type: RESET_PLAYER })
  }
}

export const seekToPosition = (value) => {
  return async (dispatch) => {
    await TrackPlayer.seekTo(value)
    dispatch({ type: SEEK_TO_POSITION })
  }
}

export const playNextTrack = () => {
  return async (dispatch, getState) => {
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
    const artistsNames = nextTrack.artists
      .map((artist) => artist.name)
      .join(', ')
    dispatch(resetPlayer())
    dispatch(
      setCurrentTrack({
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
      })
    )
    dispatch(playTrack())
  }
}

export const playPrevTrack = () => {
  return async (dispatch, getState) => {
    const player = getState().audioPlayer
    const isAlbum = getState().track.type === 'album'
    const currentTrackIndex = player.tracks.findIndex(
      (track) => track.id === player.currentTrack.id
    )
    if (currentTrackIndex < 1) {
      TrackPlayer.seekTo(0)
    } else {
      const prevTrack = player.tracks[currentTrackIndex - 1]
      const artistsNames = prevTrack.artists
        .map((artist) => artist.name)
        .join(', ')
      dispatch(resetPlayer())
      dispatch(
        setCurrentTrack({
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
        })
      )
      dispatch(playTrack())
    }
  }
}

export const shuffleTracks = () => {
  return async (dispatch, getState) => {
    const player = getState().audioPlayer
    // filter out current playing track
    const currentTrack = player.tracks.find(
      (track) => track.preview_url === player.currentTrack.url
    )
    const filteredTracks = player.tracks.filter(
      (track) => track.id !== currentTrack.id
    )
    console.log('shuffleTracks()', filteredTracks, currentTrack)
    dispatch({ type: SHUFFLE_TRACKS })
    // apply FY algorithm to filtered tracks
    // merge current playing tracks (first) and random tracks
    // call setTracks action creator
  }
}
