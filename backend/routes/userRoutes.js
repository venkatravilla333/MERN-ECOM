let express = require('express')
let { registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserProfile, deleteUserProfile, updateUserProfile } = require('../controllers/userController.js')
const { isAuthenticatedUser } = require('../middlewares/auth.js')


let router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forget').post(forgetPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/getuser').get(isAuthenticatedUser, getUserProfile)
router.route('/deleteuser').delete(isAuthenticatedUser, deleteUserProfile)
router.route('/updateuser').put(isAuthenticatedUser, updateUserProfile)


module.exports = router