import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'

import store from './store'
import { Home, Library, Search, Profile, Authorize } from './screens'
import { icons, COLORS } from './constants'
import TabBarIcon from './components/TabBarIcon'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSrc
          if (route.name === 'Search') iconSrc = icons.search
          if (route.name === 'Home') iconSrc = icons.home
          if (route.name === 'Library') iconSrc = icons.library
          if (route.name === 'Profile') iconSrc = icons.profile
          return (
            <TabBarIcon focused={focused} name={route.name} source={iconSrc} />
          )
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          marginBottom: 30,
          paddingBottom: 0,
          backgroundColor: COLORS.black,
          marginHorizontal: 12,
          borderRadius: 100,
          borderColor: 'red',
          height: 100,
          borderColor: COLORS.lightGray2,
          borderWidth: 2,
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
  useEffect(() => {}, [SplashScreen.hide()])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Authorize'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='Authorize' component={Authorize} />
          {/* <Stack.Screen name='Main' component={MainTabNavigator} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({})

export default App
