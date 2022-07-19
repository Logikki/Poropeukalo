const express = require('express')
const app = express()
const rentsRouter = require('./controllers/rents')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

app.use(cors())
app.use(express.json())
app.use('/api/rents', rentsRouter)
app.use(express.static('build'))

mongoose.connect(config.MONGODB_URI)

module.exports = app