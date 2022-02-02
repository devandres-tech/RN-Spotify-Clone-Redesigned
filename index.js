import React from 'react'
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import TrackPlayer from 'react-native-track-player'

import { name as appName } from './app.json'
import App from './App'
import { store } from './store'
import trackService from './utils/track-player-service'

const app = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => app)
TrackPlayer.registerPlaybackService(() => trackService)
