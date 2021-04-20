const { check , body } = require('express-validator');
const UserModel = require('../Models/UserSchema')



//Registtration Validation Rules
 exports.Register = [
 check('CVMailI').isEmail().withMessage('Mail Is Not Valid').not().isEmpty().withMessage('Email Is required'),
 check('CVUserI').isLength({min:6}).withMessage('Must Be At Least 6 Chatacters').not().isEmpty().withMessage(' User name Is required'),
 check('CVPassI').isLength({min:8}).withMessage('Must Be At Least 8 Chatacters').not().isEmpty().withMessage(' Password Is required'),
 check('CVPass2I').isLength({min:8}).withMessage('Must Be At Least 8 Chatacters').not().isEmpty().withMessage(' Repeat Password Is required'),
 //Mail Uniqe Validation
 body('CVMailI').custom(InputVal=>{
 	  
 	 return UserModel.find({CVUserMail:InputVal}).then(user => { 
 	if (user.length) { 
 	console.log(user.length)
 	return Promise.reject('E-mail already in use'); 
 	
 	 }})
 	 }),
 	 //UserName Uniqe Validation
 	  body('CVUserI').custom(InputVal=>{
 	  
 	 return UserModel.find({CVUserName:InputVal}).then(user => { 
 	if (user.length) { 
 	console.log(user.length)
 	return Promise.reject('User name already in use'); 
 	
 	 }})
 	 }),
 	 //Password Matches Validation
 	 body('CVPassI').custom((value, { req }) =>{ 
 	 if (value !== req.body.CVPass2I) { 
 	 
 	 	return Promise.reject('Passwords Not Matches'); 
 	 
 	 }
 	 
 	 return true
 	 })
 
 
 ]; 
 
 
 //Login Validation Rules
 exports.Login = [
 check('CVUserI').isLength({min:6}).withMessage('Must Be At Least 6 Chatacters'),
 check('CVPassI').isLength({min:8}).withMessage('Must Be At Least 8 Chatacters')
 ]
 
 