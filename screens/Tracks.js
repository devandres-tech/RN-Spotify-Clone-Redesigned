import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import * as playlistActions from '../store/actions/playlist'

const Tracks = ({ route: { params } }) => {
  const dispatch = useDispatch()
  const { id } = params

  useEffect(() => {
    dispatch(playlistActions.getPlaylistTracks(id))
  }, [id])

  return (
    <View>
      <Text>Tracks screen</Text>
    </View>
  )
}

export default Tracks
