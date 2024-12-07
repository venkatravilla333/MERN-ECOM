
let User = require('../models/userModel.js')
let ErrorHandler = require('../utils/errorHandler.js')
const sendToken = require('../utils/sendToken.js')

//controller for user register

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

//controller for user login

async function loginUser(req, res, next) {

  let { email, password } = req.body

  if (!email || !password) {
   return next(new ErrorHandler('Please enter email & password', 400))
  }

  //check user id in db or not

  let user = await User.findOne({ email }).select("+password")
  
  if (!user) {
   return next(new ErrorHandler('Invalid email or password', 401))
  }
  
  //compare user entered password is matched with db user password
  
  let isPasswordMatched = await user.comparePassword(password)
  
  if (!isPasswordMatched) {
   return next(new ErrorHandler('Invalid email or password', 401))
  }
  
  // let token = user.getJwtToken()
  // console.log(token)

  // res.status(200).json({
  //   message: 'User login in DB successfully',
  //   token
  // })

   sendToken(user, 200, res)
  
}

module.exports = { registerUser, loginUser }