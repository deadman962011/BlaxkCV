const { check , body } = require('express-validator');

exports.SaveSkillValidation =[


check('SkillTitleI').not().isEmpty().withMessage('Skill Title cannot be empty.'),
check('SkillDescI').not().isEmpty().withMessage('Skill Descreption cannot be empty.'),
check('SkillValI').not().isEmpty().withMessage('Skill Value Date cannot  be empty'),
check('SkillColorI').not().isEmpty().withMessage('Skill Color cannot be empty')

]

exports.UpdateSkillValidation =[


check('SkillTitleUI').not().isEmpty().withMessage('Skill Title cannot be empty.'),
check('SkillDescUI').not().isEmpty().withMessage('Skill Descreption cannot be empty.'),
check('SkillValUI').not().isEmpty().withMessage('Skill Value Date cannot  be empty'),
check('SkillColorUI').not().isEmpty().withMessage('Skill Color cannot be empty'),
check('IdUI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser'),

]


exports.DelSkillValidation =[
check('ConfI').not().isEmpty().withMessage('Plase Type delete to confrim Delet'),
check('DelIdI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser'),
check('DelTypeI').not().isEmpty().withMessage('Somthing Went Wrong Please Refresh Your Browser'),
]