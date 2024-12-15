
let User = require('../models/userModel.js')
let ErrorHandler = require('../utils/errorHandler.js')
const sendEmail = require('../utils/sendEmail.js')
const sendEmailTemplate = require('../utils/sendEmailTemplate.js')
const sendToken = require('../utils/sendToken.js')
let crypto = require('crypto')

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

  let resetUrl = `${process.env.FROTNEND_URL}/api/password/reset/${resetToken}`
 
  console.log(process.env.FROTNEND_URL)
  let message = sendEmailTemplate(user.name, resetUrl)

  try {

   await sendEmail({
     email: user.email,
     subject: 'Recovery forget password',
     message: message
   })
    
    return res.status(200).json({
      message: `sent mail to :  ${user.email}`
    })
    
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    return next(new ErrorHandler(error.message, 500))
      
  }
  
}

//controller for reset password

async function resetPassword(req, res, next) {

  console.log(req.params.token)
  
 let resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex')
  
let user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt: Date.now()}
})
  console.log(user)
if (!user) {
  return next(new ErrorHandler('user is not aviable or token expired', 400))
  }
  
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('password and reset password not mathched', 400))
  }

  user.password = req.body.password

  user.resetPasswordToken = null
  user.resetPasswordExpire = null

  await user.save()

  return res.status(200).json({
    message: 'password reset successfully'
  })


}

//controller for getUser profile

async function getUserProfile(req, res, next) {

  let user = await User.findById(req.user._id)
  
  res.status(200).json({
    user
  })
}

//controller for update password

async function updatePassword(req, res, next) {

  let user = await User.findById(req.user._id).select('+password')

  let isPasswordMatched = await user.comparePassword(req.body.oldPassword)

  if (!isPasswordMatched) {
     return next(new ErrorHandler('old password is not matched', 400))
  }

  user.password = req.body.password

  user.save()

  return res.status(200).json({
    message: 'updated password successfully'
  })


 }
 
//controller for delete userProfile

async function deleteUserProfile(req, res, next) {

  let user = await User.findByIdAndDelete(req.user._id)
  
  res.status(200).json({
    'message': 'User profile deleted'
  })
}
 

//controller for user profile update

async function updateUserProfile(req, res, next) {
  let newData = {
    name: req.body.name,
    email: req.body.email
  }

  let user = await User.findByIdAndUpdate(req.user._id, newData, { new: true })
  
  return res.status(200).json({
    user
  })

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
 
//admin routes

//controller for getting all users (admin route)

async function getAllUsers(req, res, next) {
     
  let users = await User.find()

  return res.status(200).json({
    users
  })

}
 
//controller for getting each user details (admin route)

async function getUserDetails(req, res, next) {
     
  let user = await User.findById(req.params.id)

  if (!user) {
     return next(new ErrorHandler('user not found with given id', 404))
  }

  return res.status(200).json({
    user
  })

}

//controller for deleting each user  (admin route)

async function deleteUser(req, res, next) {
     
  let user = await User.findById(req.params.id)

  if (!user) {
     return next(new ErrorHandler('user not found with given id', 404))
  }

  await user.deleteOne()

  return res.status(200).json({
    message: "user deleted successfully"
  })

}


//controller for update user  (admin route)

async function updateUser(req, res, next) {
     
  let newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  }

 let user = await User.findByIdAndUpdate(req.params.id, newUserData, {new: true})

  if (!user) {
     return next(new ErrorHandler('user not found with given id', 404))
  }

  return res.status(200).json({
   user
  })

}



module.exports = { registerUser, loginUser, logoutUser, forgetPassword, resetPassword , getUserProfile, updatePassword,  deleteUserProfile, updateUserProfile, getAllUsers, getUserDetails, deleteUser, updateUser}