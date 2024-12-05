let mongoose = require('mongoose')

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


let User = mongoose.model('Users', userSchema)

module.exports = User


