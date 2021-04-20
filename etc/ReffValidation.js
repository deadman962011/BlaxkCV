const { check , body } = require('express-validator');


exports.SaveReffValidation =[
check('RefNameI').not().isEmpty().withMessage('Refference Name cannot be empty.'),
check('RefPhoneI').not().isEmpty().withMessage('Refference Phone cannot be empty.'),
check('RefMailI').not().isEmpty().withMessage('Refference Mail cannot  be empty'),
check('RefJobI').not().isEmpty().withMessage('Refference Job cannot be empty')
]


exports.UpdateReffValidation =[
check('RefNameUI').not().isEmpty().withMessage('Refference Name cannot be empty.'),
check('RefPhoneUI').not().isEmpty().withMessage('Refference Phone cannot be empty.'),
check('RefMailUI').not().isEmpty().withMessage('Refference Mail cannot  be empty'),
check('RefJobUI').not().isEmpty().withMessage('Refference Job cannot be empty'),
check('IdUI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser')
]



exports.DelReffValidation =[
check('ConfI').not().isEmpty().withMessage('Plase Type delete to confrim Delet'),
check('DelIdI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser'),
check('DelTypeI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser'),
]