import express from 'express'
import { proxySpotifyToken } from '../controllers/userController.js'

const router = express.Router()

router.post('/authentication', proxySpotifyToken)

export default router
