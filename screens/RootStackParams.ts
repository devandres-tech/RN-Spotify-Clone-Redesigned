export type RootStackParamList = {
  Tracks: {
    mediaId: string
    mediaType: string
    artist?: {
      name: ''
      type: ''
      images: [{ url: '' }]
      followers: { total: 0 }
    } | null
    isSearchItem?: boolean
  }
  TrackPlayer: undefined
  Authorize: undefined
  Library: undefined
  Home: undefined
  Main: undefined
  Profile: undefined
  Search: undefined
}
