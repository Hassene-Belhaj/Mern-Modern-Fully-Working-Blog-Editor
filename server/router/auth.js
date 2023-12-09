const express = require('express');
const { register, login, logOut, singleUser } = require('../controller/authController');
const { verifytoken } = require('../JWT/verfiyToken');
const {googleFireBaseAuth} = require('../controller/googleFireBase');
const uploadImage = require('../multer/Multer_upload_image');

const router = express.Router()

router.route('/sign-up').post(register)
router.route('/sign-in').post(login)
router.route('/logout').post(logOut)
router.route('/user/:id').get(verifytoken,singleUser)

router.route('/google-auth').post(googleFireBaseAuth)

router.route('/checkuser').get(verifytoken,(req,res)=> {
    res.status(200).json({success : true , msg : 'you are authenticated' , user : req.user} , )
})

router.route('/upload_image').post(uploadImage.single('image'),(req,res)=>{
    return res.status(200).json({msg : 'image has been upload successfully'})
})

module.exports = router
 