const express = require('express');


//Controllers
const UserController = require('../Controllers/UserController');
const MainController = require('../Controllers/Controller');

//Models
const CVModel = require("../Models/CVSchema");
//Validators
const UserValidator = require('../etc/UserValidation');
const ExpValidation = require('../etc/ExpValidation');
const EduValidation = require('../etc/EduValidation');
const SkillValidation = require('../etc/SkillValidation')
const RefValidation = require('../etc/ReffValidation');

const passport = require('passport');
const router = express.Router();


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/login')
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user');
}


router.get('/',isLoggedIn,function(req,res){
	
	//Get current User 
	var user = req.user._id;
	
	CVModel.findOne({CVUserId:user},function(err,resu){
		
			res.render("User/User",{CV:resu})
			console.log(resu)
	}).populate("BLCVUser").populate({'path':'CVExp',populate:{'path':'ExpSkill'}}).populate('CVSkill').populate('CVEdu').populate('CVReff')
	

})

router.get('/register',notLoggedIn,UserController.RegisterGet)

router.post('/register',notLoggedIn,UserValidator.Register,UserController.RegisterPost)



router.get('/login',notLoggedIn,UserController.LoginGet)

router.post('/login',notLoggedIn,UserValidator.Login,passport.authenticate('login', {
    failureRedirect: '/user/login',
    failureFlash: true
}),UserController.LoginPost)


router.get('/logout',isLoggedIn,UserController.LogoutGet);



router.post('/SaveExp',isLoggedIn,ExpValidation.SaveExpValidation,MainController.SaveExperiance)

router.post('/getExpOne',isLoggedIn,MainController.getExpOne)

router.post('/getExpAll',isLoggedIn,MainController.getExpAll)

router.post('/UpdateExp',isLoggedIn,ExpValidation.UpdateExpValidation,MainController.UpdateExperiance)

router.post('/DelExp',isLoggedIn,ExpValidation.DelExpValidation,MainController.DelExperiance)


router.post('/SaveEdu',isLoggedIn,EduValidation.SaveEduValidation,MainController.SaveEducation)

router.post('/getEduOne',isLoggedIn,MainController.getEduOne)

router.post('/UpdateEdu',isLoggedIn,EduValidation.UpdateEduValidation,MainController.UpdateEducation)

router.post('/DelEdu',isLoggedIn,EduValidation.DelEduValidation,MainController.DelEducation)

router.post('/SaveSkill',isLoggedIn,SkillValidation.SaveSkillValidation,MainController.saveSkill)

router.post('/getSkillOne',isLoggedIn,MainController.getSkillOne)

router.post('/UpdateSkill',isLoggedIn,SkillValidation.UpdateSkillValidation,MainController.UpdateSkill)

router.post('/DelSkill',isLoggedIn,SkillValidation.DelSkillValidation,MainController.DelSkill)

router.post('/SaveRef',isLoggedIn,RefValidation.SaveReffValidation,MainController.SaveReffernce)

router.post('/getRefOne',isLoggedIn,MainController.getRefOne)

router.post('/UpdateRef',isLoggedIn,RefValidation.UpdateReffValidation,MainController.UpdateReffernce)

router.post('/DelRef',isLoggedIn,RefValidation.DelReffValidation,MainController.DelReffernce)

router.post('/updateStatus',isLoggedIn,MainController.UpdateStatus)

router.post('/UpdateInf',isLoggedIn,MainController.updateInf)

module.exports = router;