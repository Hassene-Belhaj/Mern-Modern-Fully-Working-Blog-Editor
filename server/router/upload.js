const express = require('express'); 
const router = express.Router()
const multer =require('multer');
const path = require('path');
const sharp =require('sharp');
const fs = require('fs');


const storage = multer.diskStorage({
    destination : function (req, file , cb) {
        cb(null , path.join(__dirname, "../public"))
    },
    filename : function (req , file , cb) {
        cb(null ,`${Date.now()}_${file.originalname}`)
    }
    
})

const fileFilter = (req,file,cb) => {
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null , true)
} else {
    cb({msg : 'unsupported file format'})
}
}

const upload = multer({
    storage : storage ,
    fileFilter : fileFilter ,   
    limits : 5 * 1000 * 1000 ,

})

const resize =  async (req,res,next) => {
    if(!req.file) {
      return res.status(500).json({msg : "please select image"})
    } 
    await sharp(req.file.path)
    .resize({width : 800 , height : 800 , fit : 'outside'})
    .toFormat('jpeg')
    .jpeg({quality : 90})
    .toFile(`./public/images/${req.file.filename}`) // save new size image in images
    fs.unlinkSync(`./public/${req.file.filename}`) // delete original image from folder public
    next()
}


router.post('/upload_image', upload.single('image'),resize, (req,res) => {
    const image = req.file
    if(!image) {
       return res.status(500).json({msg : "please select image"})
    } 
   return res.status(200).json({msg : 'image uploaded successfully',image})
})

router.post('/delete_image' , (req,res) => {
    const {image} = req.body
    fs.unlinkSync(`./public/images/${image}`)// delete image
   return res.status(200).json({msg : 'image deleted'})


})



module.exports = router
    


















