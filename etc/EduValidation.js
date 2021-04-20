const { check , body } = require('express-validator');

exports.SaveEduValidation =[


check('EduTitleI').not().isEmpty().withMessage('Education Title cannot be empty.'),
check('EduDescI').not().isEmpty().withMessage('Education Descreption cannot be empty.'),
check('EduFromI').not().isEmpty().withMessage('Education From Date cannot  be empty'),
check('EduToI').not().isEmpty().withMessage('Education To Date cannot be empty')

]

exports.UpdateEduValidation =[
check('TitleUI').not().isEmpty().withMessage('Education Title cannot be empty.'),
check('DescUI').not().isEmpty().withMessage('Education Descreption cannot be empty.'),
check('FromUI').not().isEmpty().withMessage('Education From Date cannot  be empty'),
check('ToUI').not().isEmpty().withMessage('Education To Date cannot be empty'),
check('IdUI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser'),
]


exports.DelEduValidation =[
check('ConfI').not().isEmpty().withMessage('Plase Type delete to confrim Delet'),
check('DelIdI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser'),
check('DelTypeI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser'),
]