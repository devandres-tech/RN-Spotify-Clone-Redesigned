import TrackPlayer, { Track } from 'react-native-track-player'
import { Dispatch } from 'redux'

import { shuffle } from '../../utils/helpers'

export const PLAY_TRACK = 'PLAY_TRACK'
export const PAUSE_TRACK = 'PAUSE_TRACK'
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK'
export const RESET_PLAYER = 'RESET_PLAYER'
export const INIT_PLAYER = 'INIT_PLAYER'
export const SEEK_TO_POSITION = 'SEEK_TO_POSITION'
export const SET_TRACKS = 'SET_TRACKS'
export const SHUFFLE_TRACKS = 'SHUFFLE_TRACKS'
export const UN_SHUFFLE_TRACKS = 'UN_SHUFFLE_TRACKS'
export const REPEAT_ONE = 'REPEAT_ONE'
export const REPEAT_ALL = 'REPEAT_ALL'
export const UNSET_REPEAT = 'UNSET_REPEAT'

interface ITrack {
  artists: [{ name: string }]
  id: string
  preview_url: string
  name: string
  album: { name: string; images: [{ url: string }] }
  duration_ms: string
}

export const init = () => {
  return async (dispatch: Dispatch) => {
    await TrackPlayer.setupPlayer({})
    dispatch({ type: INIT_PLAYER })
  }
}

export const playTrack = () => {
  return async (dispatch: Dispatch) => {
    await TrackPlayer.play()
    dispatch({ type: PLAY_TRACK, isTrackPlaying: true })
  }
}

export const pauseTrack = () => {
  return async (dispatch: Dispatch) => {
    await TrackPlayer.pause()
    dispatch({ type: PAUSE_TRACK, isTrackPlaying: false })
  }
}

export const setCurrentTrack = (currentTrack: Track | Track[]) => {
  return async (dispatch: Dispatch) => {
    await TrackPlayer.add(currentTrack)
    dispatch({ type: SET_CURRENT_TRACK, currentTrack })
  }
}

export const setTracks = (tracks: []) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SET_TRACKS, tracks })
  }
}

export const resetPlayer = () => {
  return async (dispatch: Dispatch) => {
    await TrackPlayer.reset()
    dispatch({ type: RESET_PLAYER })
  }
}

export const seekToPosition = (value: number) => {
  return async (dispatch: Dispatch) => {
    await TrackPlayer.seekTo(value)
    dispatch({ type: SEEK_TO_POSITION })
  }
}

export const playNextTrack = () => {
  return async (dispatch: Dispatch, getState: any) => {
    const player = getState().audioPlayer
    const isAlbum = getState().track.type === 'album'
    const lastIndex = player.tracks.length - 1
    const currentTrackIndex = player.tracks.findIndex(
      (track: ITrack) => track.id === player.currentTrack.id
    )
    let nextTrack: ITrack
    if (currentTrackIndex === lastIndex) {
      nextTrack = player.tracks[0]
    } else {
      nextTrack = player.tracks[currentTrackIndex + 1]
    }
    const artistsNames = nextTrack.artists
      .map((artist) => artist.name)
      .join(', ')
    // dispatch(resetPlayer())
    // dispatch(
    //   setCurrentTrack({
    //     id: nextTrack.id,
    //     url: nextTrack.preview_url,
    //     title: nextTrack.name,
    //     artist: artistsNames,
    //     album: isAlbum ? getState().track.name : nextTrack.album.name,
    //     genre: '',
    //     artwork: isAlbum
    //       ? getState().track.images[0].url
    //       : nextTrack.album.images[0].url,
    //     duration: nextTrack.duration_ms,
    //     searchTerm: player.currentTrack.searchTerm
    //       ? player.currentTrack.searchTerm
    //       : '',
    //   })
    dispatch({ type: RESET_PLAYER })
    dispatch({
      type: SET_CURRENT_TRACK,
      currentTrack: {
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
      },
    })

    if (currentTrackIndex === lastIndex && !player.repeat.all) {
      // dispatch(pauseTrack())
      dispatch({ type: PAUSE_TRACK })
    } else {
      dispatch({ type: PLAY_TRACK })
    }
  }
}

export const playPrevTrack = () => {
  return async (dispatch: Dispatch, getState: any) => {
    const player = getState().audioPlayer
    const isAlbum = getState().track.type === 'album'
    const currentTrackIndex = player.tracks.findIndex(
      (track: ITrack) => track.id === player.currentTrack.id
    )
    if (currentTrackIndex < 1) {
      if (player.repeat.all) {
        const prevTrack: ITrack = player.tracks[player.tracks.length - 1]
        const artistsNames = prevTrack.artists
          .map((artist: { name: any }) => artist.name)
          .join(', ')
        // dispatch(resetPlayer())
        dispatch({ type: RESET_PLAYER })
        // dispatch(
        //   setCurrentTrack({
        //     id: prevTrack.id,
        //     url: prevTrack.preview_url,
        //     title: prevTrack.name,
        //     artist: artistsNames,
        //     album: isAlbum ? getState().track.name : prevTrack.album.name,
        //     genre: '',
        //     artwork: isAlbum
        //       ? getState().track.images[0].url
        //       : prevTrack.album.images[0].url,
        //     duration: prevTrack.duration_ms,
        //     searchTerm: player.currentTrack.searchTerm
        //       ? player.currentTrack.searchTerm
        //       : '',
        //   })
        // )
        dispatch({
          type: SET_CURRENT_TRACK,
          currentTrack: {
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
          },
        })
        // dispatch(playTrack())
        dispatch({ type: PLAY_TRACK })
      } else {
        TrackPlayer.seekTo(0)
      }
    } else {
      const prevTrack = player.tracks[currentTrackIndex - 1]
      const artistsNames = prevTrack.artists
        .map((artist: { name: any }) => artist.name)
        .join(', ')
      // dispatch(resetPlayer())
      dispatch({ type: RESET_PLAYER })
      // dispatch(
      //   setCurrentTrack({
      //     id: prevTrack.id,
      //     url: prevTrack.preview_url,
      //     title: prevTrack.name,
      //     artist: artistsNames,
      //     album: isAlbum ? getState().track.name : prevTrack.album.name,
      //     genre: '',
      //     artwork: isAlbum
      //       ? getState().track.images[0].url
      //       : prevTrack.album.images[0].url,
      //     duration: prevTrack.duration_ms,
      //     searchTerm: player.currentTrack.searchTerm
      //       ? player.currentTrack.searchTerm
      //       : '',
      //   })
      // )
      dispatch({
        type: SET_CURRENT_TRACK,
        currentTrack: {
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
        },
      })

      // dispatch(playTrack())
      dispatch({ type: PLAY_TRACK })
    }
  }
}

export const shuffleTracks = () => {
  return async (dispatch: Dispatch, getState: any) => {
    const player = getState().audioPlayer
    const currentTrack = player.tracks.find(
      (track: ITrack) => track.id === player.currentTrack.id
    )
    const filteredTracks = player.tracks.filter(
      (track: ITrack) => track.id !== currentTrack.id
    )
    const randomTracks = shuffle(filteredTracks)
    randomTracks.unshift(currentTrack)
    dispatch({ type: SHUFFLE_TRACKS, isShuffle: true, randomTracks })
  }
}

export const unShuffleTracks = () => {
  return async (dispatch: Dispatch, getState: any) => {
    const track = getState().track
    const originalTracks =
      track.type === 'track' ? [track] : getState().track.tracks.items
    dispatch({ type: UN_SHUFFLE_TRACKS, isShuffle: false, originalTracks })
  }
}

export const repeatOne = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: REPEAT_ONE,
      repeat: { one: true, all: false },
    })
  }
}

export const repeatAll = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: REPEAT_ALL,
      repeat: { one: false, all: true },
    })
  }
}

export const unsetRepeat = () => {
  return async (dispatch) => {
    dispatch({
      type: UNSET_REPEAT,
      repeat: { one: false, all: false },
    })
  }
}
