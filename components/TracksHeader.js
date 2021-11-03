import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { COLORS, FONTS } from '../constants'
import LinearGradient from 'react-native-linear-gradient'
import HTMLView from 'react-native-htmlview'

import TextTitle from './TextTitle'

const TracksHeader = ({
  imageUrl,
  title,
  totalTracks,
  mediaDescription = '',
  followers = 0,
  releaseDate = '',
  animateScale,
  type,
  scrollY,
}) => {
  return (
    <Animated.View style={styles.containerView}>
      <Animated.Image
        style={[styles.image, animateScale(scrollY)]}
        resizeMode={'cover'}
        source={{ uri: imageUrl }}
      />
      <LinearGradient
        style={styles.linearGradient}
        colors={[
          'rgba(7, 7, 7, 0.00)',
          'rgba(7, 7, 7, 0.34)',
          'rgba(7, 7, 7, 0.55)',
          COLORS.black,
          COLORS.black,
          COLORS.black,
        ]}
      />
      <TextTitle containerStyle={styles.textTitle} label={title} />
      <View style={styles.infoContainer}>
        <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
          {type.toUpperCase()}
        </Text>
        <Text style={styles.bulletDot}>{' \u25CF '}</Text>
        <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
          {totalTracks} songs
        </Text>
        {followers > 0 && (
          <>
            <Text style={styles.bulletDot}>{' \u25CF '}</Text>
            <Text
              style={{
                color: COLORS.lightGray,
                position: 'relative',
                ...FONTS.body,
              }}
            >
              {Number(followers.toFixed(2)).toLocaleString('en-US')} followers
            </Text>
          </>
        )}
        {releaseDate.length > 0 && (
          <>
            <Text style={styles.date}>{' \u25CF '}</Text>
            <Text
              style={{
                color: COLORS.lightGray,
                ...FONTS.body,
              }}
            >
              {releaseDate.substring(0, 4)}
            </Text>
          </>
        )}
      </View>
      {mediaDescription.length > 0 && (
        <HTMLView stylesheet={styles} value={`<p>${mediaDescription}</p>`} />
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  containerView: {
    alignItems: 'center',
    height: 520,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  linearGradient: {
    position: 'absolute',
    height: 280,
    width: '100%',
    bottom: 0,
  },
  textTitle: {
    textAlign: 'center',
    position: 'relative',
    bottom: 120,
  },
  infoContainer: {
    position: 'relative',
    bottom: 130,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletDot: {
    color: COLORS.lightGray,
    paddingHorizontal: 4,
    fontSize: 5,
  },
  date: { color: COLORS.lightGray, paddingHorizontal: 4, fontSize: 5 },
})

export default TracksHeader
