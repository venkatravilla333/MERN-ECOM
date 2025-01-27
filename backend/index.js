let express = require('express')
require('dotenv').config()
let connectWithDB = require('./db.js')
let productRoutes = require('./routes/productRoutes.js')
let userRoutes = require('./routes/userRoutes.js')
let orderRoutes = require('./routes/orderRoutes.js')
const errorMiddleware = require('./middlewares/errorMiddleware.js')
const cookieParser = require('cookie-parser')

let app = express()
app.use(express.json())
app.use(cookieParser())


app.use('/api', productRoutes)
app.use('/api', userRoutes)
app.use('/api', orderRoutes)


process.on('uncaughtException',(err) => {
  console.log(err.message)
  console.log('shuting down process due to uncaught Exception')
  process.exit(1)
})
// console.log(hello)


app.use(errorMiddleware)

connectWithDB()

let server = app.listen(process.env.PORT, () => {
  console.log(`server started in port ${process.env.PORT} runs ${process.env.NODE_ENV} environment`)
})

process.on('unhandledRejection', (err) => {
  console.log('Error', err)
  console.log('Handling unhandled promise rejection')
  server.close(() => {
    process.exit(1)
  })
})




