
let User = require('../models/userModel.js')

async function registerUser(req, res, next) {

  let {name, email, password} = req.body

 var user = await User.create({
    name,
    email,
    password
  })

  res.status(201).json({
    message: 'User Registered in DB successfully'
  })
  
}

module.exports = registerUser