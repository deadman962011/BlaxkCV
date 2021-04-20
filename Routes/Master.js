const express = require('express');
const passport = require('passport');
const router = express.Router();

//Controller
const MasterController = require('../Controllers/MasterController');



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/master/login')
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard');
}


router.get('/login',notLoggedIn,MasterController.LoginGet)

router.post('/login',notLoggedIn,passport.authenticate('MasterLogin', {
    failureRedirect: '/master/login',
    failureFlash: true
}),MasterController.LoginPost)

router.get('/dashboard',isLoggedIn,function(req,res){
	console.log("goood")
})

module.exports = router;