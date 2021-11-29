import {
  PAUSE_TRACK,
  PLAY_TRACK,
  SET_TRACK,
  RESET_PLAYER,
  INIT_PLAYER,
  SEEK_TO_POSITION,
} from '../actions/audioPlayer'

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

    case SEEK_TO_POSITION:
      return {
        ...state,
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

    case INIT_PLAYER:
      return {
        ...state,
      }

    case RESET_PLAYER:
      return {
        ...state,
      }

    default:
      return state
  }
}
