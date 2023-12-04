const { createCustomError } = require("../Middleware/ErrorHandler");
const { AsyncWrapper } = require("../middleWare/AsyncWrapper");
const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password



const userFormatData = (user) => {
    return {
            profile_img : user.personal_info.profile_img ,
            username : user.personal_info.username ,
            fullname : user.personal_info.fullname 
        }
    
}

const register =AsyncWrapper(async(req,res,next) => {
    const {fullname,email,password} = req.body
    if(fullname.length < 3 ) return  next(createCustomError('Fullname must be at least 3 letters long',403))
    if(!email.length ) return  next(createCustomError('Enter email',403))
    if(!emailRegex.test(email)) return  next(createCustomError('Invalid Email',403))
    if(!passwordRegex.test(password)) return next(createCustomError('password shoud be 6 to 9 characters long with a numeric , 1 lowercase and 1 uppercase letters',403))
    
    const alreadyExist = await userModel.findOne({'personal_info.email' : email})

    if(alreadyExist) {
        return next(createCustomError('User Already Exists',409))
    }

    const uniqueUserName = `${email.split('@')[0]}_${Date.now()}`
     
    const Salt = bcrypt.genSaltSync(10)
    const cryptPwd = bcrypt.hashSync(password , Salt)
    const user = await userModel.create({  
        personal_info : {
                fullname : fullname ,
                email : email ,
                username : uniqueUserName ,
                password : cryptPwd
                }
    })
    res.status(201).json({success : true , data : userFormatData(user)})

})


const login = AsyncWrapper(async(req,res,next) => {
    const user = await userModel.findOne({'personal_info.email' : req.body.email})
    if(!user) {
        return next(createCustomError('user does not exist' , 404))
    }
    const isValidPwd = await bcrypt.compare(req.body.password , user.personal_info.password )
    if(!isValidPwd) {
        return next(createCustomError('Invalid Credentials' , 403))
    }

    const token = jwt.sign({id : user._id,role : user.role} , process.env.SECRETJWT , {expiresIn : '3d'})

     const update_user = await userModel.findByIdAndUpdate({_id : user._id} ,
     {
        access_token : token
     },
     {
        new : true ,
     })
     const {password , ...others} = update_user._doc ;
     console.log(others);
     res.cookie('access_token' ,token, {httpOnly : 'true' , secure:'true', sameSite:'none' , maxAge : 70*60*60*1000})
     res.status(200).json({success : true , msg :'sign in successfully'})
})


const singleUser = AsyncWrapper(async(req,res,next) => {
    const {id} = req.params
    const user = await userModel.findById({_id :id})
    if(!user) return next(createCustomError('user not found' , 404))
     const {password , ...others} = user._doc
    res.status(200).json({success : true , data : {...others} })
    
})



const logOut = AsyncWrapper(async(req,res) => {
    res.clearCookies('access_token ' , {sameSite : 'none', secure:'true'})
    res.status(200).json({success : true , msg : 'user logged out'})
})






module.exports = {
    register , login , logOut ,singleUser
};
