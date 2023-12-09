const multer = require('multer');


const storage = multer.diskStorage({
  destination : function (req , file ,cb) {
    cb(null , "images")
  },
  filename : function (req,file , cb) {
    cb(null , file.originalname)
  }
})


const filter = (req,file,cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype ==='image/png') {
        cb(null ,true)
    } else {
        cb({msg : 'unsupported image file format'})
    }
}

const uploadImage = multer({
    storage : storage ,
    fileFilter : filter,
    limits :2000000
})


module.exports = uploadImage
