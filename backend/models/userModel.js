let mongoose = require('mongoose')
require('dotenv').config()

let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

let crypto = require('crypto')


let userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please enter your name'],
    maxlenth: [50, 'your name can not exceed 50 chars'],
  },
  email: {
    type: String,
    require: [true, 'Please enter your email'],
    unique: true
  },
  password: {
    type: String,
    require: [true, 'Please enter your password'],
    minlength: [6, 'password length should not be lessthan 6 chars'],
    select: false

  },
  avatar: {
    public_id: String,
    url: String
  },
  role: {
    type: String,
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

//generate token

userSchema.methods.getJwtToken = function() {
return  jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY_TIME})
}

userSchema.methods.comparePassword = async function (enteredPassoword) {
 return  await bcrypt.compare(enteredPassoword, this.password)
}


//generate forget password token

userSchema.methods.getResetPasswordToken = function () {
  let generateToken = crypto.randomBytes(15).toString('hex')

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(generateToken)
    .digest('hex')
  //reset password expire

  this.resetPasswordExpire = new Date(Date.now) + 30 * 60 * 1000 
  
  return generateToken
}

let User = mongoose.model('Users', userSchema)

module.exports = User


