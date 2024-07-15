const passport=require('passport');
const LocalStratergy=require('passport-local').Strategy;
const Person=require('./models/Person');

passport.use(new LocalStratergy(async(usr,pwd,done)=>{
    try{
      //console.log('Received credentials:',usr,pwd);
      const user=await Person.findOne({username:usr});
      if(!user){
        return done(null,false,{message:'Incorrect username'});
      }
      const isPasswordMatch= await user.comparePassword(pwd);
      if(isPasswordMatch){
        return done(null,user);
      }
      else{
        return done(null,false,{message:'Incorrect password'});
      }
    }
    catch(err){
      return done(err);
    }
  }))
  

  module.exports=passport;
  