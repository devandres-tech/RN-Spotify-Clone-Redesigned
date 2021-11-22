import { PAUSE_TRACK, PLAY_TRACK, SET_TRACK } from '../actions/audioPlayer'

const initialState = {
  isTrackPlaying: false,
  track: { url: '' },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACK:
      return {
        ...state,
        track: action.track,
      }

    case PLAY_TRACK:
      return {
        ...state,
        isTrackPlaying: action.isTrackPlaying,
      }

    case PAUSE_TRACK:
      return {
        ...state,
        isTrackPlaying: action.isTrackPlaying,
      }

    default:
      return state
  }
}
