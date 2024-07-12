const mongoose =require('mongoose');
require('dotenv').config();

// Define mongodb connection url

const mongourl=process.env.MONGODB_URL
//const mongourl=process.env.MONGODB_URL_LOCAL

//Set up mongodb connection
mongoose.connect(mongourl,{
    
})

//Get the default connection
//mongoose maintains a default connection object representing the mongodb connection 
const db =mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongodb server');
});

db.on('error',(err)=>{
    console.log('connection error',err);
});

db.on('disconnected',()=>{
    console.log('disconnected to mongodb server');
});

//Export the database connection
module.exports=db;