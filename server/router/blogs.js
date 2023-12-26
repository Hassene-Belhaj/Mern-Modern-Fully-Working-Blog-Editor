const express = require('express');
const { createBlogPost, latest_Blog, trendingBlogs, loadingBlogByTagCategory, all_latest_Blogs_Count, loadingBlogByTagCategoryCount } = require('../controller/blogsController');
const { verifytoken } = require('../JWT/verfiyToken');
const router = express.Router()



router.route('/create_blog').post(verifytoken,createBlogPost)+

router.route('/search_blog').post(loadingBlogByTagCategory)

router.route('/latest_blog').post(verifytoken,latest_Blog)

router.route('/all_blogs_count').post(verifytoken,all_latest_Blogs_Count)

router.route('/blog_tag_count').post(verifytoken,loadingBlogByTagCategoryCount)

router.route('/trending_blogs').get(verifytoken,trendingBlogs)



module.exports = router
