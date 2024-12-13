
let User = require('../models/userModel.js')
let ErrorHandler = require('../utils/errorHandler.js')
const sendEmail = require('../utils/sendEmail.js')
const sendEmailTemplate = require('../utils/sendEmailTemplate.js')
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


//controller for forget password

async function forgetPassword(req, res, next) {

  let user = await User.findOne({ email: req.body.email})
  
  if (!user) {
   return next(new ErrorHandler('user is not available in db', 404))
  }
  
  let resetToken = user.getResetPasswordToken()

  await user.save()

  let resetUrl = `${process.env.FROTNEND_URL}/api/password/forget${resetToken}`
 
  let message = sendEmailTemplate(user.name, resetUrl)

  try {

   await sendEmail({
     email: user.email,
     subject: 'Recovery forget password',
     message: message
   })
    
    return res.status(200).json({
      message: `reset password:  ${user.name}`
    })
    
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    return next(new ErrorHandler(error.message, 500))
      
  }
  
  
}

//controller for user logout

async function logoutUser(req, res, next) {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({
    message: 'Logged out user'
  })

 }

module.exports = { registerUser, loginUser, logoutUser, forgetPassword }