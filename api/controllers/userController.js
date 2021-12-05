// const spotifyConfig = {
//   clientId: '*******',
//   clientSecret: '**********',
//   redirectUrl: 'com.authdemo://oauthredirect',
// }

export const proxySpotifyToken = (req, res) => {
  const { code } = req.body
  const refreshToken = req.body.refresh_token

  if (!code && !refreshToken) {
    return res.status(403).json({ success: false, data: 'Not authorized' })
  }

  if (refreshToken) {
    return res.json({ todo: 'Refresh accesstoken' })
  }

  if (code) {
    console.log('CLIENT_SECRETE', process.env.CLIENT_ID)
    return res.json({ todo: 'Get refresh token & access token' })
  }
}
