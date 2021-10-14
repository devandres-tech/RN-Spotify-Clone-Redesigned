import React from 'react'
import { View, Text, ScrollView } from 'react-native'

import { COLORS, FONTS, SIZES } from '../constants'

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: SIZES.padding,
      }}
    >
      <ScrollView>
        {/* header  */}
        <View style={{ paddingTop: 40 }}>
          <Text style={{ color: COLORS.white, ...FONTS.h1 }}>
            Good morning 'name'
          </Text>
        </View>
        {/* recently played */}
        {/* wrapped  */}
        {/* popular */}
        {/* featured */}
        {/* new releases */}
      </ScrollView>
    </View>
  )
}

export default Home
