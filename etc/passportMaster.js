const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const UserModel= require("../Models/UserSchema")


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
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
		
		
		
		
		