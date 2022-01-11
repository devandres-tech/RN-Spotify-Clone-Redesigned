export type RootStackParamList = {
  Tracks: {
    mediaId: string
    mediaType: string
    artist?: {
      name: string
      type: string
      images: { url: string }[]
      // followers?: number | { total: number }
      followers?: { total: number }
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
