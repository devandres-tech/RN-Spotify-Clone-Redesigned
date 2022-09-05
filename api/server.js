import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()

import userRoutes from './routes/userRoutes.js'

const API_PORT = 4000

const api = express()

api.use(bodyParser.urlencoded({ extended: true }))

api.use(express.json())

api.use('/api/user', userRoutes)

api.listen(API_PORT, () => {
  console.log(`Server running on port ${API_PORT}`)
})
