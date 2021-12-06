import dotenv from 'dotenv'
import SpotifyWebApi from 'spotify-web-api-node'
dotenv.config()

const spotifyConfig = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URL,
}

const spotifyApi = new SpotifyWebApi(spotifyConfig)

export const proxySpotifyToken = async (req, res) => {
  const { code } = req.body
  const refreshToken = req.body.refresh_token

  if (!code && !refreshToken) {
    return res.status(403).json({ success: false, data: 'Not authorized' })
  }

  if (refreshToken) {
    spotifyApi.setRefreshToken(refreshToken)
    spotifyApi
      .refreshAccessToken()
      .then(
        (data) => {
          data.body.refreshToken = refreshToken
          return res.json(data.body)
        },
        (error) => {
          console.log('Could not refresh access token', error)
        }
      )
      .catch((onError) => {
        return res.json(onError)
      })
  }

  if (code) {
    spotifyApi
      .authorizationCodeGrant(code)
      .then(
        (data) => {
          return res.json(data.body)
        },
        (err) => {
          console.log('Something went wrong,', err)
        }
      )
      .catch((error) => {
        return res.json(error)
      })
  }
}
