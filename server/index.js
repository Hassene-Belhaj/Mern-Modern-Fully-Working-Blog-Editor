const express = require('express');
const app = express()
const cors = require('cors')
require('dotenv').config();
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./config/connectToDb');
const AuthRouter = require('./router/auth');
const uploadRouter = require('./router/upload');
const blogsRouter = require('./router/blogs');
const { errorHandler } = require('./Middleware/ErrorHandler');
const { NotFound } = require('./Middleware/NotFound');
// firebase auth
const admin = require('firebase-admin');
const serviceAccountGoogleKey = require('./ServiceAccountGoogle/serviceAccount.json');
const jwt = require('jsonwebtoken');
const path = require('path');
app.use(express())
app.use(cors({
   origin : ["http://localhost:5173"] ,
   credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())


admin.initializeApp({  
 credential : admin.credential.cert(serviceAccountGoogleKey)   
})

// multer storage
app.use("/public",express.static(path.join(__dirname,"/public")))

const Start = async() => {
 try {
    await connectDb(process.env.MONGODB , console.log('connected to DataBase'))
    app.listen(process.env.URL || 7000 , ()=> {
        console.log('server is running');
    } )
 } catch (error) {
    console.log(error);
 }

}


Start()

app.use('/api/blog/auth',AuthRouter)
app.use('/api/blog',uploadRouter)
app.use('/api/blog',blogsRouter)
app.use(errorHandler)
app.use(NotFound)


