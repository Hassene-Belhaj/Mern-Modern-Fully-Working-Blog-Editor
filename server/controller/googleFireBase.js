const { getAuth } = require("firebase-admin/auth");
const userModel = require("../models/user");
const { AsyncWrapper } = require("../middleWare/AsyncWrapper");
const { createCustomError } = require("../Middleware/ErrorHandler");
const { jwt } = require("jsonwebtoken");


const googleFireBaseAuth = AsyncWrapper(async(req,res)=>{
    
    let {access_token} = req.body ;
    // console.log(access_token);
    const decodedUser = await getAuth().verifyIdToken(access_token)
    //  console.log(decodedUser);
    const {email , name ,picture} = decodedUser
    const isUserMongoExist = await userModel.findOne({'personal_info.email' : email})

    if(isUserMongoExist){
        if(!isUserMongoExist.google_auth) {
            return next(createCustomError(' this email was sign up without google . Please sign in with password to access the account ' , 403))
        } else {
            const uniqueUserName = `${email.split('@')[0]}_${Date.now()}`
            const addUser = await userModel.create({
               personal_info : {
                   fullname : name ,
                   username : uniqueUserName ,
                   email : email ,
                   profil_img : picture
               }
               
            })  

            const token = jwt.sign({id : user._id,role : user.role} , process.env.SECRETJWT , {expiresIn :'3d'})

                const update_user = await userModel.findByIdAndUpdate({_id : user._id} ,
                {
                      access_token : token    
                },
                {
                        new : true ,
                })
                const {password , ...others} = update_user._doc ;
                console.log(others);
                res.cookie('access_token' , token ,{httpOnly: true , sameSite :'none' , secure: true , maxAge : 72*60*60*1000})
                res.status(200).json({success : true , msg :'sign in successfully'})


        }

    }

    // .select('personal_info.fullname  personnal_info.username  personal_info.profile_img  google_auth')
    // if(isUserMongoExist) {
    //     return console.log(isUserMongoExist || null);
    // }

        //    let user = await User.findOne({"personal_info.email" : email}).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth").then((u)=>{
            //       return u || null
            //    })
            //    .catch(err => {
                //       return res.status(500).json({"err" : err.message})
                //    })
                //    if(user) {
                    //       if(!user.google_auth){
                        //          return res.status(403).json({"error" : "this email was signed up without google please log in with password to access the account"})
                        //       }
                        //    }else {
 //       const username = `${email.split('@')[0]}_${Date.now()}`
 //       user = new User({
     //          personal_info : {fullname : name , email : email , profile_img : picture , username} ,
     //          google_auth: true
     //       })
     //       await user.save().then((u)=> {
         //          user = u
         //       })
         //       .catch(err => {
             
             //          return res.status(500).json({"err" : err.message})
             //       })
             
             //       const update_user = await User.findByIdAndUpdate({_id : user._id} ,
             //       {
                 //          access_token : access_token
                 //       },
                 //       {
                     //          new : true ,
                     //       })
                     
                     //       const {password , ...others} = update_user._doc ;
                     //       console.log(others);
                     //        res.cookie('access_token' , token ,{httpOnly: true , sameSite :'none' , secure: true , maxAge : 72*60*60*1000})
                     //        res.status(200).json({success : true , msg :'sign in successfully'})
                     //    }
                     // })
                     // .catch(err => {
                         //    return res.status(500).json({"err" : "failed to authenticate you with google"})
                         
                         //   })
                         
                         
})


module.exports = {
    googleFireBaseAuth 
    
};


