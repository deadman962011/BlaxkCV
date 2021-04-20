const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');
const path = require('path');
const session = require('express-session')
const csrf = require('csurf')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const dotenv =require('dotenv').config()
const port = process.env.PORT||5000;


//require Route Files
const MainRoutes = require('./Routes/Main');
const UserRoutes = require('./Routes/User');
const MasterRoutes = require('./Routes/Master');

const app = express();


//Body Parser Initialize
app.use(express.json()); 
app.use(express.urlencoded());



//Logger
app.use(morgan('dev'));

//Template Engine
app.set('view engine', 'pug');
app.set('views', './Views');
app.use(express.static('Public'));

//mongoose
var mongoDB = process.env.MONGOURL; 
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}); 
//Get the default connection 
var db = mongoose.connection; 
//Bind connection to error event (to get notification of connection errors) 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Session Initialize
app.use(session({
	secret:process.env.SESSSECERT,
	name:process.env.SESSNAME,
	saveUninitialized:false}))
app.use(flash())
app.use(passport.initialize()); app.use(passport.session());
require('./etc/passport');
app.use(cookieParser());


//Routes 
app.use('/',MainRoutes);
app.use('/user',UserRoutes);
app.use('/master',MasterRoutes);


const csrfProtection = csrf({
	cookie:true
})


//Server
app.listen(port,function(err){
	
	console.log('App Working At Port '+port)
	
})