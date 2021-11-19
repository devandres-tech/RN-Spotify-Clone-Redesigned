import { PAUSE_TRACK, PLAY_TRACK } from '../actions/audioPlayer'

const initialState = {
  isTrackPlaying: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
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
