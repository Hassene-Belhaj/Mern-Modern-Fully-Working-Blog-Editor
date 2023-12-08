const { getAuth } = require("firebase-admin/auth");
const userModel = require("../models/user");
const { AsyncWrapper } = require("../middleWare/AsyncWrapper");
const { createCustomError } = require("../Middleware/ErrorHandler");
const jwt = require("jsonwebtoken");





const googleFireBaseAuth = AsyncWrapper(async(req,res,next)=>{
    
    let {access_token} = req.body ;

    const decodedUser = await getAuth().verifyIdToken(access_token)

    const {email , name , picture} = decodedUser

    const user = await userModel.findOne({'personal_info.email' : email})
    // .select("personal_info.fullname personal_info.username personal_info.profile_img google_auth")

    if(user){ // login 
        if(!user.google_auth) {
            return next(createCustomError(' This Email was sign up without Google . Please sign in with password to access the your Account ' , 403))
        } 
        
    }  else { // sign up
        const uniqueUserName =`${email.split('@')[0]}_${Date.now()}`  

        const addUser = await userModel.create({
            personal_info : {
                fullname : name ,
                username : uniqueUserName ,
                email : email ,
                profile_img : picture ,
            },
            google_auth : true ,              
        })  
           
    }

    // send token to user already in DB and login
    const token = jwt.sign({id : user._id} , process.env.SECRETJWT , {expiresIn :'3d'})

        await userModel.findByIdAndUpdate({_id : user._id} ,
        {
           access_token : token
        },
        {
           new : true ,
        })

res.cookie('access_token' , token ,{httpOnly: true , sameSite :'none' , secure: true , maxAge : 72*60*60*1000})
res.status(200).json({success : true , msg :'sign in successfully'})
                         
})


module.exports = {
    googleFireBaseAuth 
    
};


