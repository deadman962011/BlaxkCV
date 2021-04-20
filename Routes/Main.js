const express = require('express');


//Controller
const MainController = require('../Controllers/MainController');

const router = express.Router();

router.get('/',MainController.Main);

//router.get('/:name',MainController.CVOne);


module.exports = router;