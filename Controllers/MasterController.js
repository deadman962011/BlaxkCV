








exports.LoginGet = function(req,res,next){
	
	
	res.render('Master/Login')
	
	
}



exports.LoginPost = function(req,res,next){
	
	
	
	console.log("master login done")
	console.log(req.isAuthenticated())
	res.redirect('/master/dashboard')
}