
require('dotenv').config()
let mongoose = require('mongoose')


async function connectWithDB() {
   mongoose.connect(process.env.DB_URL)
  .then(() => {
  console.log('DB connected')
}).catch(() => {
  console.log('DB not connected')
})
}

module.exports = connectWithDB