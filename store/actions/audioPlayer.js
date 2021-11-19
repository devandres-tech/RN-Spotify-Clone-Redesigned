export const PLAY_TRACK = 'PLAY_TRACK'
export const PAUSE_TRACK = 'PAUSE_TRACK'

export const playTrack = () => {
  return async (dispatch) => {
    dispatch({ type: PLAY_TRACK, isTrackPlaying: true })
  }
}

export const pauseTrack = () => {
  return async (dispatch) => {
    dispatch({ type: PAUSE_TRACK, isTrackPlaying: false })
  }
}
