const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const UserModel= require("../Models/UserSchema")


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	
	 if(id ===0){
	 	done(id)
	 }
	
	
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});



passport.use('login',new LocalStrategy( {
	   usernameField: 'CVUserI',
    passwordField: 'CVPassI',
    
},
function(username, password, done) { 
	  
				UserModel.findOne({ CVUserName: username }, function (err, user) { 
				console.log('inside strat')
				  if (err) { return done(err); } 
				  if (!user) { 
				  console.log('user not found')
				  return done(null, false); }
				  if (!user.validPassword(password)) { 
				  console.log('wrong password')
				  return done(null, false); }
				  console.log("done login ")
				   return done(null, user);
				   
				    }); 
				    
				    } 
				   
		));
		


passport.use('MasterLogin',new LocalStrategy( {
	   usernameField: 'MasterUserI',
    passwordField: 'MasterPassI',
    
},
function(username, password, done) { 
	  
	  
	  var MasterUser = process.env.MASTERUSER;
	  var MasterPass = process.env.MASTERPASS;
	  
	  
	  if( username != MasterUser && password != MasterPass){
				  console.log('user not found')
				  return done(null, false);
	  }
	  
	  if(MasterUser === username && MasterPass != password){
	    console.log('wrong password')
				  return done(null, false);	
	  }
	  
	  var user ={
	  	id:0,
	  	user:MasterUser,
	  	pass:MasterPass
	  }
	  
	  return done(null, user);
	  				   
	  				   
				    
	} 
				   
		));
		
		
		
		
			