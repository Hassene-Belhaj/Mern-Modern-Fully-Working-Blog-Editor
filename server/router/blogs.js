const express = require('express');
const { createBlogPost, latest_Blog, trendingBlogs, loadingBlogByTagCategory, all_latest_Blogs_Count, loadingBlogByTagCategoryCount, SearchUsersBlog } = require('../controller/blogsController');
const { verifytoken, verifyUser } = require('../JWT/verfiyToken');
const router = express.Router()



router.route('/create_blog').post(verifytoken,createBlogPost)+

router.route('/search_blog').post(loadingBlogByTagCategory)

router.route('/latest_blog').post(latest_Blog)

router.route('/all_blogs_count').post(verifytoken,all_latest_Blogs_Count)

router.route('/blog_tag_count').post(verifytoken,loadingBlogByTagCategoryCount)

router.route('/trending_blogs').get(verifytoken,trendingBlogs)  

router.route('/search_users_blogs').post(verifytoken,SearchUsersBlog)



module.exports = router
