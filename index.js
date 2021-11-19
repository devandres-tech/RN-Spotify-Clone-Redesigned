import React from 'react'
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'

import store from './store'
import App from './App'
import { name as appName } from './app.json'
import TrackPlayer from 'react-native-track-player'

const app = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => app)
TrackPlayer.registerPlaybackService(() =>
  require('./utils/track-player-service')
)
