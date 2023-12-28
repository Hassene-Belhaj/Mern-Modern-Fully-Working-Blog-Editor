const express = require('express');
const { register, login, logOut, singleUser, get_Profile } = require('../controller/authController');
const { verifytoken } = require('../JWT/verfiyToken');
const {googleFireBaseAuth} = require('../controller/googleFireBase');

const router = express.Router()

router.route('/sign-up').post(register)
router.route('/sign-in').post(login)
router.route('/logout').post(logOut)
router.route('/user/:id').get(verifytoken,singleUser)

router.route('/google-auth').post(googleFireBaseAuth)

router.route('/user').post(get_Profile)

router.route('/checkuser').get(verifytoken,(req,res)=> {
    res.status(200).json({success : true , msg : 'you are authenticated' , user : req.user} , )
})






module.exports = router
 