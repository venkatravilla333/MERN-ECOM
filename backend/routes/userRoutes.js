let express = require('express')
const registerUser = require('../controllers/userController.js')


let router = express.Router()

router.route('/register').post(registerUser)


module.exports = router