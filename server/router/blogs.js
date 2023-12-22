const express = require('express');
const { createBlogPost, latestBlog, trendingBlogs } = require('../controller/blogsController');
const { verifytoken } = require('../JWT/verfiyToken');
const router = express.Router()



router.route('/create_blog').post(verifytoken,createBlogPost)
router.route('/latest_blog').get(verifytoken,latestBlog)
router.route('/trending_blogs').get(trendingBlogs)



module.exports = router
