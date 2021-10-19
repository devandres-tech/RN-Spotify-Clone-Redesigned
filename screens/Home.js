import React, { useEffect } from 'react'
import { View, FlatList, Image, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { COLORS, SIZES } from '../constants'
import * as userActions from '../store/actions/user'
import { TextButton, HorizontalCardContainer, Header } from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'

const topArtists = [
  {
    images: [
      {
        url: 'https://i.scdn.co/image/ab6761610000e5ebeac49a5b3aab7642cebba535',
      },
    ],
    name: 'Anuel AA',
    id: '1',
  },
  {
    images: [
      {
        url: 'https://i.scdn.co/image/ab6761610000e5eb5d0fc400392250a750a9403e',
      },
    ],
    name: 'J Balvin',
    id: '2',
  },
  {
    images: [
      {
        url: 'https://i.scdn.co/image/ab6761610000e5eb6ad57a3cb26ae3ffd0f28f22',
      },
    ],
    name: 'Bad Bunny',
    id: '3',
  },
]

const Home = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(userActions.getProfile())
    // dispatch(userActions.getPlaylists(10))
    // dispatch(userActions.getRecentlyPlayed(10))
    // dispatch(userActions.getTopArtists('long_term', 3))
  }, [dispatch])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: SIZES.paddingTop,
        backgroundColor: COLORS.black,
        paddingBottom: 100,
        width: '100%',
      }}
    >
      <FlatList
        // ListHeaderComponent={
        //   <Header name={user.data.display_name.split(' ')[0]} />
        // }
        ListFooterComponent={
          <View>
            {/* <HorizontalCardContainer
              cardItemTextStyle={{ paddingLeft: 20 }}
              data={user.playlists}
              label='MY PLAYLISTS'
            /> */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES.padding,
                paddingBottom: SIZES.paddingBottom,
              }}
            >
              <TextButton
                label='explore'
                buttonContainerStyle={{ paddingHorizontal: 26 }}
              />
              <TextButton
                label='upgrade to premium'
                buttonContainerStyle={{
                  paddingHorizontal: 26,
                  backgroundColor: COLORS.black,
                  borderColor: COLORS.white,
                  borderWidth: 1,
                }}
              />
            </View>
            {/* <HorizontalCardContainer
              cardItemImageStyle={{ opacity: 1 }}
              cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
              data={user.recentlyPlayed}
              label='RECENTLY PLAYED'
            /> */}
            {/* <HorizontalCardContainer
              // containerStyle={{ width: 70 }}
              cardItemImageStyle={{ width: 50 }}
              cardItemImageStyle={{ opacity: 1 }}
              cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
              data={topArtists}
              label='RECENTLY PLAYED'
            /> */}

            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                paddingRight: SIZES.padding,
                paddingHorizontal: SIZES.padding,
                // width: 145,
              }}
            >
              <View
                style={{
                  // backgroundColor: 'red',
                  // width: '100%',
                  // flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                  // justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    width: 100,
                    width: '100%',
                    // alignSelf: 'center',
                    // zIndex: 10,
                    // justifyContent: 'center',
                    // alignSelf: 'center',
                    // marginHorizontal: 30,
                    // marginLeft: 100,
                    backgroundColor: 'yellow',
                  }}
                >
                  YOUR TOP ARTISTS
                </Text>
                {topArtists.reverse().map((artist) => {
                  return (
                    <View style={{ width: 30 }}>
                      <Image
                        style={{
                          // paddingRight: 10,
                          height: 135,
                          width: 68,
                          borderRadius: 20,
                          // position: 'relative',
                          // right: 100,
                          // zIndex: 0,
                        }}
                        source={{ uri: artist.images[0].url }}
                      />
                    </View>
                  )
                })}
                <View></View>
                {/* </View> */}
              </View>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  )
}

export default Home
