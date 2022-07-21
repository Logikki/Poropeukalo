const path  = require('path')
const frontRouter = require('express').Router()

/* Handles requests to url /varaasivu, returns index.html 
App uses this mainly when refreshing the page. */

frontRouter.get('/varaasivu', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../build/index.html'))
})

module.exports = frontRouter