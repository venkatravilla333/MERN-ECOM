let express = require('express')
let { registerUser, loginUser, logoutUser, forgetPassword } = require('../controllers/userController.js')


let router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forget').post(forgetPassword)


module.exports = router