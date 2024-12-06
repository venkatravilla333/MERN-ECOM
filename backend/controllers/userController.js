
let User = require('../models/userModel.js')

async function registerUser(req, res, next) {

  let {name, email, password} = req.body

 var user = await User.create({
    name,
    email,
    password
 })
  let token = user.getJwtToken()
  console.log(token)

  res.status(201).json({
    message: 'User Registered in DB successfully',
    token
  })
  
}

module.exports = registerUser