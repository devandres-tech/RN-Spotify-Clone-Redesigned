import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector, useDispatch } from 'react-redux'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Home, Library, Search, Profile, Authorize, Tracks } from './screens'
import { icons, COLORS, SIZES } from './constants'
import HomeSvg from './assets/icons/ic_home.svg'
import SearchSvg from './assets/icons/ic_search.svg'
import { TabBarIcon } from './components'
import * as authActions from './store/actions/auth'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          // let iconSrc = HomeSvg
          // if (route.name === 'Home') iconSrc = HomeSvg
          // if (route.name === 'Search') iconSrc = SearchSvg
          // if (route.name === 'Library') iconSrc = icons.library
          // if (route.name === 'Profile') iconSrc = icons.profile
          return <TabBarIcon focused={focused} name={route.name} />
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          marginBottom: 10,
          paddingBottom: 0,
          backgroundColor: COLORS.black,
          marginHorizontal: 12,
          borderRadius: 100,
          height: 90,
          borderTopColor: COLORS.black,
          shadowColor: '#000',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        },
      })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Search' component={Search} />
      <Tab.Screen name='Library' component={Library} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}

const App = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  // TODO refactor useeffect
  useEffect(() => {
    const getTokensFromAsyncStorage = async () => {
      const authData = await AsyncStorage.getItem('authData')
      const { accessToken, refreshToken } = await JSON.parse(authData)
      dispatch(authActions.setTokens(accessToken, refreshToken))
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
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: COLORS.black,
          paddingHorizontal: SIZES.paddingTop,
        }}
      >
        <ActivityIndicator size='large' color={COLORS.primary} />
      </View>
    )
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
