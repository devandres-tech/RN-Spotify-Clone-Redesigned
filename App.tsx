import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { RootStackParamList } from './screens/RootStackParams'
import { useAppSelector, useAppDispatch } from './hooks/hooks'
import { Authorize, Tracks, TrackPlayer } from './screens'
import { MainTabNavigator, LoadingSpinner } from './components'
import { verticalAnimation } from './utils/animations'
import * as authActions from './store/actions/auth'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    SplashScreen.hide()
  }, [])

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
      dispatch(authActions.setTokens(accessToken, refreshToken))
    }
    tryLogin()
  }, [dispatch])

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
