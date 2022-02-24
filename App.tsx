import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'

import { RootStackParamList } from './screens/RootStackParams'
import { LoadingSpinner, Header } from './components'
import { useAppSelector, useAppDispatch } from './hooks/redux-hooks'
import { Authorize, TrackPlayer } from './screens'
import HomeTabs from './navigation/HomeTabs'

import {
  setTokens,
  requestRefreshedAccessTokenAsync,
} from './store/slices/authSlice'
import { ScrollView } from 'react-native-gesture-handler'

const Stack = createStackNavigator<RootStackParamList>()

const App = () => {
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  useEffect(() => {
    const tryLogin = async () => {
      const authData = await AsyncStorage.getItem('authData')
      if (!authData) return
      const { accessToken, refreshToken, accessTokenExpirationDate } =
        await JSON.parse(authData)
      if (
        new Date(accessTokenExpirationDate) <= new Date() ||
        !accessToken ||
        !refreshToken
      ) {
        dispatch(requestRefreshedAccessTokenAsync(refreshToken))
        return
      }
      dispatch(setTokens({ accessToken, refreshToken }))
    }
    tryLogin()
  }, [dispatch])

  if (auth.tokenIsLoading) return <LoadingSpinner />

  return (
    <>
      <StatusBar
        translucent={true}
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={() => ({
            headerShown: false,
            tabBarShowLabel: false,
          })}
        >
          {auth.accessToken ? (
            <Stack.Group>
              <Stack.Screen name='HomeTabs' component={HomeTabs} />
              <Stack.Screen
                name='TrackPlayer'
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
                component={TrackPlayer}
              />
            </Stack.Group>
          ) : (
            <Stack.Screen name='Authorize' component={Authorize} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App
