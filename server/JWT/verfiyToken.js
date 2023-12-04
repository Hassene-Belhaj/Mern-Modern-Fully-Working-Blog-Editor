const jwt = require('jsonwebtoken');
const { createCustomError } = require('../Middleware/ErrorHandler');


const verifytoken = (req,_res,next) => {
    const token = req.cookies.access_token
    if(!token) {
        return next(createCustomError('you are not authenticated' , 401))
    }
    jwt.verify(token , process.env.SECRETJWT,(err , user) => {
        if(err) {
            return next(createCustomError('token is invalid' , 403))
        } else {
            req.user = user
        }
    })
    next()
}


const verifyUser = (req,res,next) => {
    verifytoken(req,res , ()=> {
        if(req.user._id === req.params.id || req.user.role === 'admin') {
            next()
        } else {
            return next(createCustomError('unauthorized !' , 403))
        }

    }) 
}

const verifyAdmin = (req,res,next) => {
    verifytoken(req,res , ()=> {
     if(req.user.role === 'admin') {
        next()
     } else {
        return next(createCustomError('only admin is authorized !' , 403))

     }  
    })
}



module.exports = {
    verifytoken ,verifyUser , verifyAdmin
};
