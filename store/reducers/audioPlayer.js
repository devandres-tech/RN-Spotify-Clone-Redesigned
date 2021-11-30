import {
  PAUSE_TRACK,
  PLAY_TRACK,
  SET_CURRENT_TRACK,
  RESET_PLAYER,
  INIT_PLAYER,
  SEEK_TO_POSITION,
  SET_TRACKS,
  SHUFFLE_TRACKS,
} from '../actions/audioPlayer'

const initialState = {
  isTrackPlaying: false,
  currentTrack: { url: '' },
  tracks: [{}],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_PLAYER:
      return {
        ...state,
      }

    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.currentTrack,
      }

    case SET_TRACKS:
      return {
        ...state,
        tracks: action.tracks,
      }

    case SHUFFLE_TRACKS:
      return {
        ...state,
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

    case RESET_PLAYER:
      return {
        ...state,
      }

    default:
      return state
  }
}
