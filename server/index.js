const express = require('express');
const app = express()
const cors = require('cors')
require('dotenv').config();
const cookieµParser = require('cookie-parser');
const { connectDb } = require('./config/connectToDb');


app.use(express())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieµParser())




const Start = async() => {
 try {
    await connectDb(process.env.MONGODB , console.log('connected to DataBase'))
    app.listen(process.env.PORT || 7000 , ()=> {
        console.log('server is running');
    } )
 } catch (error) {
    console.log(error);
 }

}


Start()