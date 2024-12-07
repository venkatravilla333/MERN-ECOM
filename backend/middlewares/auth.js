let jwt = require('jsonwebtoken')
const User = require('../models/userModel')

async function isAuthenticatedUser(req, res, next) {

  let { token } = req.cookies
  console.log(token)

  let decode = await jwt.verify(token, process.env.JWT_SECRET)
  console.log(decode.id)

  res.user = await User.findById(decode.id)

  next()
}

module.exports = isAuthenticatedUser