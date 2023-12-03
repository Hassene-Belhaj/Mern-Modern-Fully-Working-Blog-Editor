const express = require('express');
const { register, login } = require('../controller/authController');
const router = express.Router()

router.route('/sign-up').post(register)
router.route('/sign-in').post(login)


module.exports = router
