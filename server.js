//convert json to object
/*const jsonString='{"name":"John","age": 30,"city": "New york"}';
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.name);*/

//convert object to json
/*const objectToConvert = {
    name : "Alice",
    age : 25
};

const json = JSON.stringify(objectToConvert);
console.log(json);
*/

const express = require('express');
const app = express();
const db = require('./db'); // connect with the database
require('dotenv').config();
const passport=require('./auth');

const bodyParser = require('body-parser'); // Middle ware of express.js
app.use(bodyParser.json());

const PORT=process.env.PORT || 3000;

//Middle ware function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest);

app.use(passport.initialize());
  
const localAuthMiddleware= passport.authenticate('local',{session:false});
app.get('/',logRequest, function (req, res) {
  res.send(' welcome to our restaurant');
  console.log('data fetched from hotel');
});

/*app.get('/idli', function (req, res) {
  var customized_idli={
    name :'rava idli',
    size :'10 cm diameter',
    is_sambhar: true,
    is_chuteny: false
  }
  res.send(customized_idli);
});

app.post('/items',(req,res)=>{
  res.send('data saved');
});*/

//Import the router file
const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');

// Use the routes
app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(PORT, () => {
  console.log("server is running at port 3000");
});
