const { check , body } = require('express-validator');

exports.SaveExpValidation =[
check('ExpTitleI').not().isEmpty().withMessage('Experiance Title cannot be empty.'),
check('ExpDescI').not().isEmpty().withMessage('Experiance Descreption cannot be empty.'),
check('ExpFromI').not().isEmpty().withMessage('Experiance From Date cannot  be empty'),
check('ExpToI').not().isEmpty().withMessage('Experiance To Date cannot be empty')
]

exports.UpdateExpValidation =[
check('TitleUI').not().isEmpty().withMessage('Experiance Title cannot be empty.'),
check('JobUI').not().isEmpty().withMessage('Experiance Job cannot be empty.'),
check('DescUI').not().isEmpty().withMessage('Experiance Descreption cannot be empty.'),
check('FromUI').not().isEmpty().withMessage('Experiance From Date cannot  be empty'),
check('ToUI').not().isEmpty().withMessage('Experiance To Date cannot be empty'),
check('IdUI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser'),
]


exports.DelExpValidation =[
check('ConfI').not().isEmpty().withMessage('Plase Type delete to confrim Delet'),
check('DelIdI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser'),
check('DelTypeI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser'),
]