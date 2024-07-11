const mongoose =require('mongoose');

// Define mongodb connection url

const mongourl = 'mongodb://127.0.0.1:27017/hotels';

//Set up mongodb connection
mongoose.connect(mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology:true
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