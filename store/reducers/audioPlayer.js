import {
  PAUSE_TRACK,
  PLAY_TRACK,
  SET_CURRENT_TRACK,
  RESET_PLAYER,
  INIT_PLAYER,
  SEEK_TO_POSITION,
  SET_TRACKS,
  SHUFFLE_TRACKS,
  UN_SHUFFLE_TRACKS,
  REPEAT_ALL,
  REPEAT_ONE,
  UNSET_REPEAT,
} from '../actions/audioPlayer'

const initialState = {
  isTrackPlaying: false,
  currentTrack: { url: '' },
  tracks: [{}],
  isShuffle: false,
  repeat: { one: false, all: false },
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

    case REPEAT_ONE:
      return {
        ...state,
        repeat: action.repeat,
      }

    case REPEAT_ALL:
      return {
        ...state,
        repeat: action.repeat,
      }

    case UNSET_REPEAT:
      return {
        ...state,
        repeat: action.repeat,
      }

    case SHUFFLE_TRACKS:
      return {
        ...state,
        isShuffle: action.isShuffle,
        tracks: action.randomTracks,
      }

    case UN_SHUFFLE_TRACKS:
      return {
        ...state,
        isShuffle: action.isShuffle,
        tracks: action.originalTracks,
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
