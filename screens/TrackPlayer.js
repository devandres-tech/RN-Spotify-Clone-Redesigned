import React from 'react'
import { View, Text } from 'react-native'

const TrackPlayer = ({ navigation }) => {
  return (
    <View style={{ paddingBottom: 40 }}>
      <Text
        style={{ color: 'black', paddingBottom: 39 }}
        onPress={() => navigation.goBack()}
      >
        TRACK PLAYER
      </Text>
    </View>
  )
}

export default TrackPlayer
