const { check, validationResult } = require('express-validator');


//Models
const UserModel= require("../Models/UserSchema");
const CVModel = require("../Models/CVSchema");
const ContactModel = require('../Models/ContactSchema')



exports.LoginGet = function(req,res,next){
	console.log(res.locals._token)
	res.render('User/Login');
	
}

exports.LoginPost= function(req,res,next){
	
	  //Get Inputs
	  console.log(req.body)
	  
	  var username= req.body.CVUserI;
	  var password = req.body.CVPassI;
	  
	  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    return res.status(422).json({ errors: errors.array() })
    	}

	  //Attempt login 
	  res.redirect('/user');

	
}

exports.RegisterGet = function(req,res,next){
	//	UserModel.remove({},function(err,resu){
			//		 console.log(resu)
				//})
//		CVModel.remove({},function(err,resu2){
		//	   console.log(resu2)
	//	});

	res.render('User/Register');
	
}

exports.RegisterPost = function(req,res,next){
	

	
	//Get Inputs
	  var CVMailI = req.body.CVMailI;
	  var  CVUserI = req.body.CVUserI;
	  var CVPassI = req.body.CVPassI;
	  var CVPass2I = req.body.CVPass2I;
	  var CVFirstNameI = req.body.CVFirstI;
	  var CVLastNameI = req.body.CVLastI;
	  var CVJobI = req.body.CVJobI;
	  var CVGenderI = req.body.CVGenderI;
	  var CVBirthDateI = req.body.CVBirthDateI;
	  console.log(CVBirthDateI)
	  
	  //Validate Inputs
				const errors = validationResult(req) 
				if (!errors.isEmpty()) { 
				return res.status(422).json({ errors: errors.array() })
				}
	
	//Save User On DB
	var SaveUser = new UserModel();
	SaveUser.CVUserMail = CVMailI;
	SaveUser.CVUserName = CVUserI;
	SaveUser.CVUserPass = SaveUser.encryptPassword(CVPassI);
	SaveUser.save(function(err,result){
		console.log(result)
		console.log(err)
		
		 //create new cv 
		 if(!err){
		 	
		  	var UserId = result._id
		 	
		 	 var SaveCv= new CVModel();
		 	 SaveCv.CVUserId = UserId;
		 	 SaveCv.CVFirstName = CVFirstNameI;
		 	 SaveCv.CVLastName= CVLastNameI;
		 	 SaveCv.CVJob = CVJobI;
		 	 SaveCv.CVPersonalInf = 'Put Your Personal Information Here';
		 	 SaveCv.CVGender = CVGenderI;
		 	 SaveCv.CVBirthDate= CVBirthDateI;
		 	 
		 	 console.log(SaveCv)
		 	 SaveCv.save(function(err,result2){
		 	 	
		 	 	 console.log(err)
		 	 	 console.log(result2)
		 	 	 //Create Contact Row 
		 	 	 if(!err){
		 	 	 	
		 	 	 	var CVId = result2._id;
		 	 	 	
		 	 	 	var SaveContact = new ContactModel();
		 	 	 	SaveContact.CId = CVId;
		 	 	 	SaveContact.CFb = '#';
		 	 	 SaveContact.CTw = '#';
		 	 	 	SaveContact.CInsta = '#';
		 	 	 	SaveContact.CTt = '#';
		 	 	 	SaveContact.CLin = '#';
		 	 	 	SaveContact.CMail = '#';
		 	 	 	SaveContact.save(function(err,result3){
		 	 	 		
		 	 	 				 	 	 	console.log(result3)
		 	 	 				 	 	 	console.log(err)
		 	 	 	})
		 	 	 }	
		 	 })
		 }
	})
	//console.log(SaveUser)
	//Send Activation Mail To User Mail
	
}




exports.LogoutGet=function(req,res,next){
	
    req.logout();
    res.redirect('/');

	
	
}