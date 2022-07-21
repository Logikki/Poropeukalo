require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let EMAIL = process.env.EMAIL
let PASS = process.env.PASS


module.exports = {
  MONGODB_URI,
  PORT,
  EMAIL,
  PASS
}