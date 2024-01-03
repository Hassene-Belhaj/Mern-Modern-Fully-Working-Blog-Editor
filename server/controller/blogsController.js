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



   const latest_Blog = AsyncWrapper(async(req,res,next)=> {

    const {page} = req.body ;

    const maxLimit = 5 ;
    const resp = await blogModel.find({draft : false})
    .populate("author","personal_info.fullname personal_info.email  personal_info.profile_img  personal_info.username -_id")
    .sort({"publishedAt" : -1})
    .select("blog_id title desc banner activity tags publishedAt -_id")
    .skip( (page - 1) * maxLimit )
    .limit(maxLimit)
    if(!resp) {
       return next(createCustomError('somethig went wrong please try later' , 500))
    }
    return res.status(200).json({success : true ,  resp })
   })

 // pagination send countdocuments
   const all_latest_Blogs_Count = AsyncWrapper(async(req,res,next)=> {
       const totalDocs = await blogModel.countDocuments({draft : false})
       if(!totalDocs) {
        return next(createCustomError('somethig went wrong please try later' , 500))
     }
       return res.status(200).json({totalDocs})
   }) 


   const trendingBlogs = AsyncWrapper(async(req,res,next)=> { 

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

   // blogs by tags or query    
   const loadingBlogByTagCategory = AsyncWrapper(async(req,res,next) => {

       const {tag , page , query , author, limit , eliminate_blog} = req.body

       const maxLimit = limit ? limit : 2

    let findQuery ;
    if(tag) {
        findQuery = {tags : tag , draft : false , blog_id : {$ne : eliminate_blog}}
    } else if(query) {
        findQuery = { draft : false ,  title : new RegExp(query , 'i')}
    } else if(author) {
        findQuery = {draft : false , author }
    }

    const resp = await blogModel.find(findQuery)
    .populate("author","personal_info.fullname personal_info.email  personal_info.profile_img  personal_info.username  -_id")
    .sort( {"activity.total_reads" : -1, "activity.total_likes" : -1 , "publishedAt" : -1} )
    .select("blog_id title desc banner activity tags publishedAt -_id")
    .skip( (page - 1) * maxLimit )
    .limit(maxLimit)
    if(!resp) {
        return next(createCustomError('somethig went wrong please try later' , 500))
    }
    return res.status(200).json({success :true , resp})
    
})


const loadingBlogByTagCategoryCount = AsyncWrapper(async(req,res) => {
    const { tag , query , author } = req.body
    let findQuery ;
    if(tag) {
        findQuery={draft : false , tags: tag}
    } else if(query) {
        findQuery={draft : false , title : new RegExp(query , 'i')}
    } else if (author){
        findQuery ={draft : false , author}
    }
    const totalDocs = await blogModel.countDocuments(findQuery)
    return res.status(200).json({totalDocs})
   })



const SearchUsersBlog = AsyncWrapper(async(req,res) => {
   const {query} = req.body
   const resp = await userModel.find( {"personal_info.username" : new RegExp(query , 'i') })
   .limit(50)
   .select("personal_info.username personal_info.fullname personal_info.profile_img -_id")
   res.status(200).json({resp})
})


const get_single_blog = AsyncWrapper(async(req,res,next)=> {

    const {blog_id} = req.body
     const incrementVal = 1
        const resp = await blogModel.findOneAndUpdate({blog_id} ,
           {$inc : {"activity.total_reads" : incrementVal}}
           )
           .populate("author" , "personal_info.fullname personal_info.username personal_info.email personal_info.profile_img")
           .select("title desc banner content activity publishedAt tags ")
        if(!resp) {
            return next(createCustomError('somethig went wrong please try later' , 500))
        }
        const UpdatedAuthor = await userModel.findOneAndUpdate({"personal_info.username" : resp.author.personal_info.username},
           {$inc : {"account_info.total_reads" : incrementVal }}
        )
        if(!UpdatedAuthor) {
            return next(createCustomError('somethig went wrong please try later' , 500))
        }
        return res.status(200).json({success : true , resp})

})





    module.exports = {  
        createBlogPost , latest_Blog , trendingBlogs , loadingBlogByTagCategory , 
        all_latest_Blogs_Count ,loadingBlogByTagCategoryCount , SearchUsersBlog ,get_single_blog
    };
