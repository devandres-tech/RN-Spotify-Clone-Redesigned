import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TabBarIcon = ({ focused, name, source }) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: focused ? COLORS.primary : '',
          borderRadius: 100,
          height: 60,
          width: 60,
        }}
      >
        <Image
          style={{
            tintColor: focused ? COLORS.white : COLORS.lightGray,
            height: 28,
            width: 28,
          }}
          source={source}
        />
        <Text
          style={{
            color: focused ? COLORS.white : COLORS.lightGray,
            fontSize: 10,
          }}
        >
          {name.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default TabBarIcon
