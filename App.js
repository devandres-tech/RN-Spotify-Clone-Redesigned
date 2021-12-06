import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector, useDispatch } from 'react-redux'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Authorize, Tracks, TrackPlayer } from './screens'
import { COLORS, SIZES } from './constants'
import { MainTabNavigator, LoadingSpinner } from './components'
import { verticalAnimation } from './utils/animations'
import * as authActions from './store/actions/auth'

const Stack = createNativeStackNavigator()

const App = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  // initial render
  useEffect(() => {
    const getTokensFromAsyncStorage = async () => {
      const authData = await AsyncStorage.getItem('authData')
      try {
        const { accessToken, refreshToken } = await JSON.parse(authData)
        dispatch(authActions.setTokens(accessToken, refreshToken))
      } catch (error) {
        console.log('error', error)
      }
    }
    getTokensFromAsyncStorage()
  }, [dispatch])

  useEffect(() => {
    const tryLogin = async () => {
      const authData = await AsyncStorage.getItem('authData')
      if (!authData) {
        return
      }
      const { accessToken, refreshToken, accessTokenExpirationDate } =
        await JSON.parse(authData)
      if (
        new Date(accessTokenExpirationDate) <= new Date() ||
        !accessToken ||
        !refreshToken
      ) {
        dispatch(authActions.requestRefreshedAccessToken(refreshToken))
        return
      }
    }
    tryLogin()
  }, [dispatch, auth])

  if (auth.tokenIsLoading) {
    return <LoadingSpinner />
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent={true}
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}
        >
          {auth.accessToken ? (
            <Stack.Group>
              <Stack.Screen name='Main' component={MainTabNavigator} />
              <Stack.Screen name='Tracks' component={Tracks} />
              <Stack.Screen
                name='TrackPlayer'
                options={verticalAnimation}
                component={TrackPlayer}
              />
            </Stack.Group>
          ) : (
            <Stack.Screen name='Authorize' component={Authorize} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
