const { check, validationResult } = require('express-validator');

//models
const ExpModel = require('../Models/ExperianceSchema');
const EduModel = require('../Models/EducationSchema');
const SkillModel = require('../Models/SkillSchema');
const RefModel = require('../Models/ReffernceSchema');
const CVModel = require("../Models/CVSchema");





exports.SaveExperiance = function(req,res,next){
	  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({errors:errors.array()})
    	}
   else{
   	
   	// get logged in User id
    var user = req.user._id;
   
   	
   
   //get ids of skills
   var ExpSkillI = req.body.ExpSkillI;
  
    
  
 				//Save Experiance
			var saveExp = new ExpModel();
			saveExp.ExpTitle = req.body.ExpTitleI;
			saveExp.ExpDesc = req.body.ExpDescI;
			saveExp.ExpJob = req.body.ExpJobI;
			saveExp.ExpFrom = req.body.ExpFromI;
			saveExp.ExpTo = req.body.ExpToI;
	 	saveExp.ExpSkill=ExpSkillI;
			saveExp.save(function(err,result){
				
				console.log(result)
				
  	 //get cv and save ref
  	 CVModel.findOne({CVUserId:user}).exec(function(err,result2){
	
		if(!err){
	  
			result2.CVExp.push(saveExp._id);
			result2.save(function(err,result3){
				
				//get Experiances
				 
				
				res.send(result)
				
			})
		}
			})
			})
			}
}
  
exports.getExpOne = function(req,res,next){
	
	var expId = req.body.IdI;
	
	ExpModel.findById(expId,function(err,result){
		
		if(!err){
					return res.send(result)
		}

		
	}).populate('ExpSkill')
		
}

exports.getExpAll= function(req,res,next){


	//get Experiances 
	ExpModel.find({},function(err,result){

		if(!err){
			return res.status(200).json(result)
		}

	}).populate('ExpSkil')


}


exports.UpdateExperiance= function(req,res,next){
	
		  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({errors:errors.array()})
    	}
	
	//get experiance
	var ExpId = req.body.IdUI;
	var newData = {};
	newData.ExpTitle = req.body.TitleUI;
	newData.ExpDesc = req.body.DescUI;
	newData.ExpJob = req.body.JobUI;
	newData.ExpTo = req.body.ToUI;
	newData.ExpFrom = req.body.FromUI;
	
	console.log(ExpId)
	console.log(newData)
	ExpModel.findOneAndUpdate({_id:ExpId},newData,{useFindAndModify:false},function(err,result){
		
		console.log(err)
		console.log(result)
		return res.send(result)
		
	})
}


exports.DelExperiance = function(req,res,next){
	
	
		  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({errors:errors.array()})
    	}
	
	  console.log(req.body)
	
	 //get CV id 
 	CVModel.findOne({ CVUserId: req.user._id },function(err,result0){
		
			//get current user cv id
	 var cvId = result0._id;
	 console.log('cvId ',cvId)
 	
	//get and check experiance id
	var expId = req.body.DelIdI;
		console.log('experiance id',expId)
	
		ExpModel.findById(expId,function(err,result){
		
		if(!err){
			if(result){
				
				//get cv and remove exp id from arr 
				CVModel.findById(cvId,function(err,result2){
					
					var ExpArr=result2.CVExp
					var indexExp=ExpArr.indexOf(expId)
					ExpArr.splice(indexExp,1)
					console.log('new arr',ExpArr)
					
					//update cv ExpCv 
					result2.CVExp = ExpArr;
					result2.save(function(err,result3){
						
						console.log(err)
						console.log(result3)
						
						if(!err){
							
								//delete experiance
								ExpModel.deleteOne({_id:expId},function(err,resul4){
									
									console.log(err)
									console.log(resul4)
									
									res.send(resul4)
									
								})
						}
					})
				})
			}
		}
	})
})
		
}


exports.SaveEducation = function(req,res,next){
	  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({ errors: errors.array() })
    	}
    		
    	// get logged in User id
    var user = req.user._id;
   	console.log("Controller is Working")
   	console.log(req.body)
 	
	 				//Save Education 
			var saveEdu = new EduModel();
			saveEdu.EduTitle = req.body.EduTitleI;
			saveEdu.EduDesc = req.body.EduDescI;
			saveEdu.EduFrom = req.body.EduFromI;
			saveEdu.EduTo = req.body.EduToI;
			saveEdu.save(function(err,result){
				
  	 //get cv and save rer
  	  CVModel.findOne({CVUserId:user}).exec(function(err,result2){
	   	console.log(err)
	   	console.log(result2)
	
		if(!err){
	   console.log(saveEdu._id)
			result2.CVEdu.push(saveEdu._id);
			result2.save(function(err,result3){
				console.log(err,'result 3 here')
				console.log(result3)
			})
		}
		
		})
			})	
}






exports.getEduOne = function(req,res,next){
	
	var eduId = req.body.IdI;
	
	EduModel.findById(eduId,function(err,result){
		
		if(!err){
					return res.send(result)
		}
	})
}


exports.UpdateEducation = function(req,res,next){
	
		  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({errors:errors.array()})
    	}
	
		//get experiance
	var EduId = req.body.IdUI;
	var newData = {};
	newData.EduTitle = req.body.TitleUI;
	newData.EduDesc = req.body.DescUI;
	newData.EduTo = req.body.ToUI;
	newData.EduFrom = req.body.FromUI;
	
	console.log(EduId)
	console.log(newData)
	EduModel.findOneAndUpdate({_id:EduId},newData,{useFindAndModify:false},function(err,result){
		
		console.log(err)
		console.log(result)
		return res.send(result)
		
	})
	
}



exports.DelEducation = function(req,res,next){
	
		
			  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({errors:errors.array()})
    	}
		
	  console.log(req.body)
	
	 //get CV id 
 	CVModel.findOne({ CVUserId: req.user._id },function(err,result0){
		
			//get current user cv id
	 var cvId = result0._id;
	 console.log('cvId ',cvId)
 	
	//get and check experiance id
	var eduId = req.body.DelIdI;
		console.log('education id',eduId)
	
		EduModel.findById(eduId,function(err,result){
		
		if(!err){
			if(result){
				
				//get cv and remove edu id from arr 
				CVModel.findById(cvId,function(err,result2){
					
					var EduArr=result2.CVEdu
					var indexEdu=EduArr.indexOf(eduId)
					EduArr.splice(indexEdu,1)
					console.log('new arr',EduArr)
					
					//update cv EduCv 
					result2.CVEdu = EduArr;
					result2.save(function(err,result3){
						
						console.log(err)
						console.log(result3)
						
						if(!err){
							
								//delete experiance
								EduModel.deleteOne({_id:eduId},function(err,resul4){
									
									console.log(err)
									console.log(resul4)
									
								})
						}
					})
				})
			}
		}
	})
})
	
}


exports.saveSkill = function(req,res,next){
    
    	 
    
   
     	  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({ errors: errors.array() })
    	}
    	
    	//get current user
     var user = req.user._id;
    	
    	//Save Skill 
    	var saveSkill = new SkillModel();
    	saveSkill.SkillTitle = req.body.SkillTitleI;
    	saveSkill.SkillDesc = req.body.SkillDescI;
    	saveSkill.SkillVal = req.body.SkillValI;
    	saveSkill.SkillColor = req.body.SkillColorI;
    	saveSkill.save(function(err,result){
    		
    		 console.log(err)
    		 console.log(result)
    		 
    		 if(!err){
    		 	
    		 	 //update CV ref 
    		 	 CVModel.findOne({CVUserId:user},function(err,result2){
    		 	 	
    		 	 	console.log(err)
    		 	 	console.log(result2)
    		 	 	 		 	 	
    		 	 	result2.CVSkill.push(saveSkill._id)
    		 	 	result2.save(function(err,result3){
    		 	 		
    		 	 		 console.log(result3)
    		 	 		 console.log(err)
    		 	 		
    		 	 	})
    		 	 })    		 	
    		 }
    	})	
}


exports.getSkillOne = function(req,res,next){
	
		var skillId = req.body.IdI;
	
	SkillModel.findById(skillId,function(err,result){
		
		if(!err){
					return res.send(result)
		}
	})
	
	
}


exports.UpdateSkill = function(req,res,next){
	
	
		  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({errors:errors.array()})
    	}
	
			//get Skill
	var SkillId = req.body.IdUI;
	var newData = {};
	newData.SkillTitle = req.body.SkillTitleUI;
	newData.SkillDesc = req.body.SkillDescUI;
	newData.SkillVal = req.body.SkillValUI;
	newData.SkillColor = req.body.SkillColorUI;
	
	console.log(SkillId)
	console.log(newData)
	SkillModel.findOneAndUpdate({_id:SkillId},newData,{useFindAndModify:false},function(err,result){
		
		console.log(err)
		console.log(result)
		return res.send(result)
		
	})
	

	
}


exports.DelSkill = function(req,res,next){
	
		  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({errors:errors.array()})
    	}
	
	
		  console.log(req.body)
	
	 //get CV id 
 	CVModel.findOne({ CVUserId: req.user._id },function(err,result0){
		
			//get current user cv id
	 var cvId = result0._id;
	 console.log('cvId ',cvId)
 	
	//get and check skill id
	var skillId = req.body.DelIdI;
		console.log('Skill id',skillId)
	
		SkillModel.findById(skillId,function(err,result){
		
		if(!err){
			if(result){
				
				//get cv and remove exp id from arr 
				CVModel.findById(cvId,function(err,result2){
					
					var SkillArr=result2.CVSkill;
					var indexSkill=SkillArr.indexOf(skillId)
					SkillArr.splice(indexSkill,1)
					console.log('new arr',SkillArr)
					
					//update cv ExpCv 
					result2.CVSkill = SkillArr;
					result2.save(function(err,result3){
						
						console.log(err)
						console.log(result3)
						
						if(!err){
							
								//delete experiance
								SkillModel.deleteOne({_id:skillId},function(err,resul4){
									
									console.log(err)
									console.log(resul4)
									
									res.send(resul4)
									
								})
						}
					})
				})
			}
		}
	})
})
}





exports.SaveReffernce = function(req,res,next){
	
	
    	
		  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({errors:errors.array()})
    	}
	
	   	// get logged in User id
    var user = req.user._id;
  
 				//Save Refference
			var saveRef = new RefModel();
			saveRef.RefName = req.body.RefNameI;
			saveRef.RefJob = req.body.RefJobI;
			saveRef.RefPhone = req.body.RefPhoneI;
			saveRef.RefMail = req.body.RefMailI;
			saveRef.save(function(err,result){
				
		//		console.log(result)
		console.log(err)
				
  	 //get cv and save ref
  	 CVModel.findOne({CVUserId:user}).exec(function(err,result2){
	
	 console.log(result2)
	 console.log(err)
		if(!err){
	  
			result2.CVReff.push(saveRef._id);
			result2.save(function(err,result3){
				
				console.log(err)
	//			console.log(result2)
			//	res.send(result)
				console.log(result3)
				
			})
		}
			})
	})
	
	
	
}



exports.getRefOne= function(req,res,next){
	
	
	var refId = req.body.RefIdI;
	
	RefModel.findById(refId,function(err,result){
		
		if(!err){
					return res.send(result)
		}
	})	
	
}



exports.UpdateReffernce = function(req,res,next){
	
		  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({errors:errors.array()})
    	}
	
			//get Ref
	var RefId = req.body.IdUI;
	var newData = {};
	newData.RefName = req.body.RefNameUI;
	newData.RefJob = req.body.RefJobUI;
	newData.RefPhone = req.body.RefPhoneUI;
	newData.RefMail = req.body.RefMailUI;
	
	console.log(RefId)
	console.log(newData)
	RefModel.findOneAndUpdate({_id:RefId},newData,{useFindAndModify:false},function(err,result){
		
		console.log(err)
		console.log(result)
		return res.send(result)
		
	})
	

	
	
	
}

exports.DelReffernce = function(req,res,next){
	
	
		  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({errors:errors.array()})
    	}
	
		  console.log(req.body)
	
	 //get CV id 
 	CVModel.findOne({ CVUserId: req.user._id },function(err,result0){
		
			//get current user cv id
	 var cvId = result0._id;
	 console.log('cvId ',cvId)
 	
	//get and check Refference id
	var RefId = req.body.DelIdI;
		console.log('Reff id',RefId)
	
		RefModel.findById(RefId,function(err,result){
		
		if(!err){
			if(result){
				
				//get cv and remove ref id from arr 
				CVModel.findById(cvId,function(err,result2){
					
					var RefArr=result2.CVReff;
					var indexRef=RefArr.indexOf(RefId)
					RefArr.splice(indexRef,1)
					console.log('new arr',RefArr)
					
					//update cv ExpCv 
					result2.CVReff = RefArr;
					result2.save(function(err,result3){
						
						console.log(err)
						console.log(result3)
						
						if(!err){
							
								//delete Refference
								RefModel.deleteOne({_id:RefId},function(err,resul4){
									
									console.log(err)
									console.log(resul4)
									
									res.send(resul4)
									
								})
						}
					})
				})
			}
		}
	})
})

}



exports.UpdateStatus = function(req,res,next){
	
	var type = req.body.TypeI;
	var id = req.body.IdI;
	var status = req.body.StatusI
	var newData = {};
	console.log('inside conteoller')
 console.log(id)
	console.log('status is',status)
	console.log(type)
		

	
	
	
	if(type ==='exp'){

 	if(status === '0'){ 
		 newData.ExpStatus = 1;
		 console.log('status is 0')
	 }
		if(status === '1'){ 	
 		newData.ExpStatus = 0;		
 		console.log('status is 1')
	 }
	 
	 console.log(newData)
		ExpModel.findOneAndUpdate({_id:id},newData,{useFindAndModify:false},function(err,result){
			
			if(err){
				res.send(300)
			}
			else{
				
				ExpModel.findById(id,function(err,result2){
					
					 console.log(result2)
					 res.send(result2)
				})
				
			}
			
		})
		
	}
	
		if(type ==='edu'){

 	if(status === '0'){ 
		 newData.EduStatus = 1;
	 }
		if(status === '1'){ 	
 		newData.EduStatus = 0;		
	 }
		EduModel.findOneAndUpdate({_id:id},newData,{useFindAndModify:false},function(err,result){
			
			if(err){
				res.send(300)
			}
			else{
				res.send(result)
			}
			
		})
		
	}
	
		if(type ==='ref'){

 	if(status === '0'){ 
		 newData.ReffStatus = 1;
	 }
		if(status === '1'){ 	
 		newData.ReffStatus = 0;		
	 }
		RefModel.findOneAndUpdate({_id:id},newData,{useFindAndModify:false},function(err,result){
			
			if(err){
				res.send(300)
			}
			else{
				res.send(result)
			}
			
		})
		
	}
	
}


exports.updateInf = function(req,res,next){
	
		  //Validate Inputs 
	  	const errors = validationResult(req) 
	  if (!errors.isEmpty()) { 
	    console.log(errors.array())
	    return res.status(422).json({errors:errors.array()})
    	}
	
	
	// get Current user
	var user = req.user._id;
	console.log(req.body)
	
	var newData = {};
	//Get Inputs
	newData.CVFirstName=req.body.FirstNameI;
	newData.CVLastName=req.body.LastNameI;
	newData.CVJob=req.body.JobI;	   
	newData.CVPersonalInf=req.body.PresonalInfI;
	newData.CVGender=req.body.GenderI;
	newData.CVBirthDate=req.body.BirthDateI;
	console.log(newData)
	
	// Update Cv 
	
	CVModel.findOneAndUpdate({CVUserId:user},newData,{useFindAndModify:false},function(err,result){
		
		console.log(err)
		console.log(result)
		
		
	})
	

	
	
}