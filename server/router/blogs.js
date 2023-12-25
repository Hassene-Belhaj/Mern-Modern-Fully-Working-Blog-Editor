const express = require('express');
const { createBlogPost, latestBlog, trendingBlogs, loadingBlogByTagCategory, allBlogsCount } = require('../controller/blogsController');
const { verifytoken } = require('../JWT/verfiyToken');
const router = express.Router()



router.route('/create_blog').post(verifytoken,createBlogPost)
router.route('/search_blog').post(loadingBlogByTagCategory)
router.route('/latest_blog').post(verifytoken,latestBlog)
router.route('/all_latest_blogs_count').post(allBlogsCount)
router.route('/search_blog_count').post(loadingBlogByTagCategory)
router.route('/trending_blogs').get(trendingBlogs)



module.exports = router
