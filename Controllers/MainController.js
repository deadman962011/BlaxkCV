const { check, validationResult } = require('express-validator');


exports.Main = function (req,res,next){
	
	res.render('Main');
	
}


exports.CVOne = function(req,res,next){
	
	 // get param name and split it 
	 
	 var name = req.params.name;
	 console.log(name)
	 
	// var sname = slice("-",name)
	 
	//console.log(sname)
	
}