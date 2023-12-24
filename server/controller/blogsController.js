    const { createCustomError } = require("../Middleware/ErrorHandler");
    const { AsyncWrapper } = require("../middleWare/AsyncWrapper");
    const blogModel = require("../models/blog");
    const userModel = require("../models/user");




    const createBlogPost = AsyncWrapper(async(req,res,next) => { 

    const userId = req.user.id

    const {title , banner , desc , content ,tags ,draft, author} = req.body
    
    if(!title.length) return next(createCustomError('you must provide a Title to publish this Post',403))

    if(!draft) {
        if(!banner.length) return next(createCustomError('you must provide blog banner to publish the blog',403))
        if(!desc.length) return next(createCustomError('you must provide blog description',403))
        if(!content.length) return next(createCustomError('there must be some blog content to publish it',403))
        if(!tags.length || tags.lenght > 10) return next(createCustomError('provide tags to publish the blog , maximum 10',403))
    }

    //  tags = tags.map((tag)=>tag.toLowerCase())

    const blog_id = title.replace(/[^a-zA-Z0-9]/g,' ').replace(/\s+/g,"-").trim()+`${Date.now()}` ;
    
    const postBlog = await blogModel.create({
        blog_id,
        title ,
        banner ,
        desc  ,
        content ,
        tags ,
        author : userId,
        draft : Boolean(draft)
    })

    if(!postBlog) return next(createCustomError('can not create a new Blog Post' , 500)) 


    const incrementVal = draft ? 0 : 1 ;  // if darft exist or not exist
    
    const updateBlogUser = await userModel.findOneAndUpdate({_id :userId}
        ,
        { $inc : 
            { "account_info.total_posts" : incrementVal } , 
        $push : 
            { blogs : postBlog._id } , 
        } 

        )
        
        if(!updateBlogUser) return next(createCustomError('failed to update total posts number', 500))
        res.status(200).json({msg: 'added successfullly'})
    })

   const latestBlog = AsyncWrapper(async(req,res,next)=> {
       const maxLimit = 5 ;
       
    const countDocument =   await blogModel.countDocuments({draft : false})
    const count = Math.ceil(countDocument /maxLimit)
    const {page} = req.body
    // pagination 
    const resp = await blogModel.find({draft : false})
    .populate("author","personal_info.fullname personal_info.email  personal_info.profile_img  personal_info.username  -_id")
    .sort({"publishedAt" : -1})
    .skip( (page - 1) * maxLimit )
    .limit(maxLimit)
    if(!resp) {
       return next(createCustomError('somethig went wrong please try later' , 500))
    }
    return res.status(200).json({blogNbr : resp.length,success : true ,  resp , count :count})
   })

 // pagination
   const allBlogsCount = AsyncWrapper(async(req,res)=> {
       const count = await blogModel.countDocuments({draft : false})
       if(!count) {
        return next(createCustomError('somethig went wrong please try later' , 500))
     }
       return res.status(200).json({success : true , count})
   }) 

    
   const trendingBlogs = AsyncWrapper(async(req,res)=> { 
    const maxLimit = 5;
     const resp = await blogModel.find({draft : false})
     .populate("author","personal_info.fullname personal_info.email  personal_info.profile_img  personal_info.username  -_id")
     .sort( {"activity.total_reads" : -1, "activity.total_likes" : -1 , "publishedAt" : -1} )
     .limit(maxLimit)
     if(!resp) {
        return next(createCustomError('somethig went wrong please try later' , 500))
     }
     return res.status(200).json({success :true , resp})
   })


   const loadingBlogByTagCategory = AsyncWrapper(async(req,res,next) => {
    const maxLimit = 5 ;
    const {tag} = req.body
    const resp = await blogModel.find({tags : tag , draft : false})
    .populate("author","personal_info.fullname personal_info.email  personal_info.profile_img  personal_info.username  -_id")
    .sort( {"activity.total_reads" : -1, "activity.total_likes" : -1 , "publishedAt" : -1} )
    .limit(maxLimit)
    if(!resp) {
       return next(createCustomError('somethig went wrong please try later' , 500))
    }
    return res.status(200).json({success :true , resp})

   })

    module.exports = {  
        createBlogPost , latestBlog , trendingBlogs , loadingBlogByTagCategory , allBlogsCount
    };
