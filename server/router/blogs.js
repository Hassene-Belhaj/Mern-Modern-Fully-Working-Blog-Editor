const express = require('express');
const { createBlogPost } = require('../controller/blogsController');
const { verifytoken } = require('../JWT/verfiyToken');
const router = express.Router()



router.route('/create_blog').post(verifytoken, createBlogPost)



module.exports = router
