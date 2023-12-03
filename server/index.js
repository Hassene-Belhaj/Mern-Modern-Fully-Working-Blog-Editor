const express = require('express');
const app = express()
const cors = require('cors')
require('dotenv').config();
const cookieµParser = require('cookie-parser');
const { connectDb } = require('./config/connectToDb');
const AuthRouter = require('./router/auth');
const { errorHandler } = require('./Middleware/ErrorHandler');
const { NotFound } = require('./Middleware/NotFound');


app.use(express())
app.use(cors(
   // {
   //    origin : "http://localhost:5173",
   //    credentials : true
   // }
))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieµParser())




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
app.use(errorHandler)
app.use(NotFound)