const { createCustomError } = require("../Middleware/ErrorHandler");
const { AsyncWrapper } = require("../middleWare/AsyncWrapper");
const blogModel = require("../models/blog");
const userModel = require("../models/user");




const createBlogPost = AsyncWrapper(async(req,res,next) => {
    const userId = req.user.id
 const {title , banner , desc , content ,tags , author,draft} = req.body
 if(!title.length) return next(createCustomError('you must provide a Title to publish this Post',403))
 if(!banner.length) return next(createCustomError('you must provide blog banner to publish the blog',403))
 if(!desc.length) return next(createCustomError('you must provide blog description',403))
 if(!content.blocks.length) return next(createCustomError('there must be some blog content to publish it',403))
 if(!tags.length || tags.lenght > 10) return next(createCustomError('provide tags to publish the blog , maximum 10',403))

//  tags = tags.map((tag)=>tag.toLowerCase())

 const blog_id = `${title.toLowerCase().replace(' ' , '_')}_${Date.now()}`
 
const resp = await blogModel.create({
    blog_id,
    title ,
    banner ,
    desc  ,
    content ,
    tags ,
    author : userId,
    draft : Boolean(draft)
})

if(!resp) return next(createCustomError('can not create Blog Post' , 500)) 

let incrementVal = draft ? 0 : 1 ;

const updateBlogUser = await userModel.findOneAndUpdate({_id :userId} ,
    
    {
        $inc : {"account_info.total_posts" : incrementVal} ,
        $push : {blogs : blog_id}
    } 
 
    )

    if(!updateBlogUser) return next(createCustomError('failed to update total posts number',500))
  res.status(200).json({msg: 'added successfullly'})
})





module.exports = {
    createBlogPost
};
