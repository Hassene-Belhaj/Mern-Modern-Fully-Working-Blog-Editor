
class ApiError extends Error {
    constructor(message,statusCode) {
        super(message)
        this.statusCode =statusCode
    }
}


const createCustomError = (message , statusCode) => {
    return new ApiError(message,statusCode)
}


const errorHandler = (err, _req , res , _next) => {
    if(err instanceof ApiError) {
        return res.status(err.statusCode).json({msg : err.message})
        
    } 
    // else if (err.code === 11000) {
    //     return res.status(500).json({msg : 'User Already Exists'})
    // } 

    else {
        return res.status(500).json({msg : 'something went wrong please try later' , error : err.stack})
    }
    
}



module.exports = {
    createCustomError , errorHandler
};
