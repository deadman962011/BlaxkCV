

$(document).on('click','.SaveExpBtn',function(){
	
   // get inputs Values
  var ExpTitle =  $("input[name=ExpTitleI]").val();
  var ExpJob =  $("input[name=ExpJobI]").val();
  var ExpDesc =  $("textarea[name=ExpDescI]").val();
  var ExpFrom = $("input[name=ExpFromI]").val();
  var ExpTo =  $("input[name=ExpToI]").val();
  var ExpSkill = skillArr;
  var form = {
  	 ExpTitleI : ExpTitle,
  	 ExpDescI : ExpDesc,
  	 ExpJobI:ExpJob,
  	 ExpFromI : ExpFrom,
  	 ExpToI: ExpTo,
  	 ExpSkillI : ExpSkill
  	};
  		
  	$.ajax({
  		url:'/User/SaveExp',
  		method:'post',
  		data:form,
  		success:function(result){
  			console.log(result)
			  toastr["success"]("Experiance Saved!")

			  //Hide List
		   	  $('.ExpList').addClass('hide')

			//Display Spinnner
			$('.updateExpSpinner').addClass('disply')

			//Remove Old ExpOne
			$('.ExpOne').remove()
			  
			  //get Experiances And Upadte Experiance List 
			  $.ajax({
				  url:'/user/getExpAll',
				  method:'post',
				  success:function(getRes){

					$('.ExpList').addClass('hide')

					
					//load Experiances on list
					console.log(getRes)


					$('.ExpList').removeClass('hide')

					$.each(getRes,function(i,item){

						  $('.ExpList').append('<div class="ExpOne"><div class="card"><div class="opts"><button data-id="" data-type="" data-status="" value="" class="statusBtn">eye</button><button data-id="" data-type="" data-status="" value="" class="statusBtn">Upd</button><button data-id="" data-type="" data-status="" value="" class="statusBtn">Clse</button></div><div class="card-body" ><h2 class="card-title">Card Title</h2><p class="card-title">Card Title</p><p class="card-body">Card Body tere </p></div></div></div>')
						
					})


					 //Hide Spinner 
					 $('.updateExpSpinner').removeClass('disply')
					 $('.updateExpSpinner').addClass('hide')
			


					 //Display List Items 
					// $('.ExpList').removeClass('hide') 
				








				  },
				  error:function(err){

					consle.log(err)

				  }
			  })
			  

  		},
  		error:function(xhr){
  			
  		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })

  		}
  	})
})


//Update Experiance

$(document).on('click','.updateBtn',function(){
	
		//display loader on modal body hide form
	$('.updateForm').addClass('hide')
	$('.UpdateBtn').addClass('disabled')
	 
	
	
	var Id = $(this).data('id');
	var Type = $(this).data('type');
	
	if(Type == 'exp'){
		 var url = '/user/getExpOne'
	}
	else{
		var url = '/user/getEduOne'
	}
	
	//get  data 
	var form = {
		    IdI:Id
	}
	
	$.ajax({
		method:'post',
		url:url,
		data:form,
		error:function(xhr){
			
			  		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
			
		},
		success:function(result){
			
			console.log(result)
			
			if(Type == 'exp'){
				
					//fill inputs 
	  	$('input[name=TitleUI]').val(result.ExpTitle)
		$('textarea[name=DescUI]').val(result.ExpDesc)
		$('input[name=JobUI]').val(result.ExpJob)
		$('input[name=FromUI]').val(result.ExpFrom)
		 $('input[name=ToUI]').val(result.ExpTo)
		 $('input[name=IdUI]').val(Id)
		 $('input[name=TypeUI]').val(Type)
						
			//set Skills
			var SkillArrU = result.ExpSkill
			SkillArrU.forEach(function(skill){
				 console.log("Each Working")
				 var SkillTitle = skill._id
				 

					$(".SkillSelOne").find(["data-skillname=SkillTitle"],function(){
						
						  console.log("find working")
				   $(this).addClass('SkillSelOneC')
	   	})
				
			})


			
			
						
						
			}
			else{
				
				//fill inputs 
	  	$('input[name=TitleUI]').val(result.EduTitle)
		$('textarea[name=DescUI]').val(result.EduDesc)
		$('input[name=JobUI]').attr('disabled')
		$('input[name=JobUI]').addClass('disabled')   
  		$('input[name=FromUI]').val(result.EduFrom)
		 $('input[name=ToUI]').val(result.EduTo)
		 $('input[name=IdUI]').val(Id)
		 $('input[name=TypeUI]').val(Type)
		 

			}
			
			
			
		//hide loader and display form
		$('.updateSpinner').addClass('hide')	
		$('.updateForm').removeClass('hide')
	 $('.UpdateBtn').removeClass('disabled')
	 
		}
	})	
})



$(document).on('click','.UpdateBtn',function(){
	
	
	//get Values
			var TitleU = $('input[name=TitleUI]').val()
 		var JobU = $('input[name=JobUI]').val()
  var DescU = $('textarea[name=DescUI]').val()
  var FromU = $('input[name=FromUI]').val()
		var ToU = $('input[name=ToUI]').val()
		var IdU = $('input[name=IdUI]').val()
		var TypeU = $('input[name=TypeUI]').val()
		
		//get Skills Array
		var SkillArrU=skillArr;
		
 
 var form = {
 	TitleUI:TitleU,
 	DescUI:DescU,
 	JobUI:JobU,
 	FromUI:FromU,
 	ToUI:ToU,
 	IdUI:IdU
 }
 
 if(TypeU == 'exp'){
 	var url='/user/UpdateExp';
 }
 else{
 	var url='/user/UpdateEdu'
 }
 
 $.ajax({
 	method:'post',	
 	url:url,
 	data:form,
 	error:function(xhr){
 		
 		  		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
 		
 	},
 	success:function(result){
 		console.log(result)
 		
 		
  			toastr["success"]('Item Successfully Updated')
 		
 	}
 })
})


//End Update Experiance


//Delete Experiance


$(document).on('click','.delBtn',function(){
	
	var delId = $(this).data('id')
	var delType = $(this).data('type')
	
	console.log(delId)
	
	//fill expId input 
	$('input[name=DelIdI]').val(delId)
	$('input[name=DelTypeI]').val(delType)
	
	
})


$(document).on('click','.DelBtn',function(){
	
	//
	
	var confI = $('input[name=confI]').val();
	var DelId = $('input[name=DelIdI]').val();
	var DelType = $('input[name=DelTypeI]').val();
	
	if( confI === 'delete'){
			var form = {
		DelIdI:DelId,
		DelTypeI:DelType,
		ConfI:confI
	}
	
	console.log(DelId)
	console.log(DelType)
	
	if(DelType === 'edu'){
		
		var url = '/user/DelEdu';
		
	}
	if(DelType ==='exp'){
		
		var url ='/user/DelExp';
		
	}
	if(DelType ==='skill'){
		
		var url ='/user/DelSkill';
		
	}
	if(DelType ==='ref'){
		
		var url = '/user/DelRef';
		
	}
	
	
	console.log(DelId)
	console.log(url)
	
	$.ajax({
		method:'post',
		url:url,
		data:form,
		error:function(xhr){
			
			  		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
			
			console.log(err)
		},
		success:function(result){
			
  		toastr["success"]('Item Successfully Deleted')
			console.log(result)
		}
		
	})
		
		
	}
	else{
		
		//toaster error
		
	}
	

	
	
})

//End delete Experiance


$(document).on('click','.SaveEduBtn',function(){
	
   // get inputs Values
  var EduTitle =  $("input[name=EduTitleI]").val();
  var EduDesc =  $("textarea[name=EduDescI]").val();
  var EduFrom = $("input[name=EduFromI]").val();
  var EduTo =  $("input[name=EduToI]").val();
  
  var form = {
  	 EduTitleI : EduTitle,
  	 EduDescI : EduDesc,
  	 EduFromI : EduFrom,
  	 EduToI: EduTo
  	};
  	
  	
  	
  	$.ajax({
  		url:'/User/SaveEdu',
  		method:'post',
  		data:form,
  		success:function(result){
  			console.log(result)
  			toastr["success"]("Education Successfully Saved!")

  		},
  		error:function(xhr){
  		
  			  		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
  			
  		}
  	})
  	           
})




$(document).on('click','.SaveSkillBtn',function(){
	
   // get inputs Values
  var SkillTitle =  $("input[name=SkillTitleI]").val();
  var SkillDesc =  $("textarea[name=SkillDescI").val();
  var SkillVal =  $("select[name=SkillValI").val();
  var SkillColor =  $("input[name=SkillColorI").val();
  
  
  var form = {
  	 SkillTitleI : SkillTitle,
  	 SkillDescI : SkillDesc,
  	 SkillValI:SkillVal,
  	 SkillColorI:SkillColor
  	};
  	  	
  	$.ajax({
  		url:'/User/SaveSkill',
  		method:'post',
  		data:form,
  		success:function(result){
  			console.log(result)
  		 toastr["success"]("Skill Successfully Saved!")

  		},
  		error:function(xhr){
  		 			
  			var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
  			
  		}
  	})
  	           
})


//Update Skill 

$(document).on('click','.updateSkillBtn',function(){
	
	//get id 
	var SkillId= $(this).data('id');
	
	console.log(SkillId)
	
	var form = {
		IdI : SkillId
	}
	
	//get Skill 
	$.ajax({
		url:'/user/getSkillOne',
		method:'post',
		data:form,
		success:function(result){
			console.log(result)
			
			//fill inputs 
			$('input[name=SkillTitleUI]').val(result.SkillTitle)
			$('textarea[name=SkillDescUI]').val(result.SkillDesc)
			$('select[name=SkillValUI]').val(result.SkillVal)
			$('input[name=SkillColorUI]').val(result.SkillColor)
			$('input[name=IdUI]').val(result._id)
			
			//Display form And Hide spinner
			
		},
		error:function(xhr){
			
			  		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
			
		}
	})
})


$(document).on('click','.UpdateSkillBtn',function(){
	
	  //get value inputs
	  
			var SkillTitle = $('input[name=SkillTitleUI]').val()
			var SkillDesc = $('textarea[name=SkillDescUI]').val()
			var SkillVal = $('select[name=SkillValUI]').val()
			var SkillColor = $('input[name=SkillColorUI]').val()
			var IdUI = $('input[name=IdUI]').val()

   var form = {
   	
   	SkillTitleUI:SkillTitle,
   	SkillDescUI:SkillDesc,
   	SkillValUI:SkillVal,
   	SkillColorUI:SkillColor,
   	IdUI:IdUI
      		
   }	
   
   $.ajax({
   	url:'/user/UpdateSkill',
   	method:'post',
   	data:form,
   	success:function(result){
   		console.log(result)
   	},
   	error:function(err){
   		console.log(err)
   		
   		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
   		
   		
   	}
   })
	
})



//Save Refference
$(document).on('click','.SaveRefBtn',function(){
	
	 //get Inputs
  var RefName =	$('input[name=RefNameI]').val();
  var RefJob =	$('input[name=RefJobI]').val();
  var RefMail =	$('input[name=RefMailI]').val();
  var RefPhone =	$('input[name=RefPhoneI]').val();

  var form = {
  	
  	RefNameI:RefName,
  	RefJobI:RefJob,
  	RefPhoneI:RefPhone,
  	RefMailI:RefMail
  	
  }
  
  $.ajax({
  	url:'/user/SaveRef',
  	method:'post',
  	data:form,
  	success:function(result){
  		
  		console.log(result)
  		toastr["success"]("Refference Successfully Saved!")

  	},
  	error:function(xhr){
  		
  		  		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
  		
  		
  		
  	}
  })
})




//Update Refference 


$(document).on('click','.updateRefBtn',function(){
	
	//display spinner
	
	
	//get Ref Id 
	var RefId = $(this).data('id');
	
	var form ={
		RefIdI :RefId
	}
	
	//get Refference

 			
	$.ajax({
		url:'/user/getRefOne',
		method:'post',
		data:form,
		success:function(result){
			
			
			
			
			//fill inputs 
			$('input[name=RefNameUI]').val(result.RefName)
			$('input[name=RefJobUI]').val(result.RefJob)
 		$('input[name=RefPhoneUI]').val(result.RefPhone)
 		$('input[name=RefMailUI]').val(result.RefMail)
 		$('input[name=IdUI]').val(result._id)
 		//hide spinner
 		
 		//Display form 
			
		},
		error:function(xhr){
			
			  		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
			
		}
	})
	
	
})




$(document).on('click','.UpdateRefBtn',function(){
	
	
	  //get value inputs
	  
			var RefName = $('input[name=RefNameUI]').val()
			var RefJob = $('input[name=RefJobUI]').val()
			var RefPhone = $('input[name=RefPhoneUI]').val()
			var RefMail = $('input[name=RefMailUI]').val()
			var IdUI = $('input[name=IdUI]').val()

   var form = {
   	
   	RefNameUI:RefName,
   	RefJobUI:RefJob,
   	RefPhoneUI:RefPhone,
   	RefMailUI:RefMail,
   	IdUI:IdUI
      		
   }	
   
   $.ajax({
   	url:'/user/UpdateRef',
   	method:'post',
   	data:form,
   	success:function(result){
   		console.log(result)
   	},
   	error:function(xhr){
   		
   		  		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
   		
   	}
   })
   
   })

	



//Update Status 

$(document).on('click','.statusBtn',function(){

	//get id and type 
	var id = $(this).data('id');
	var type = $(this).data('type'); 
	var status =  $(this).val(); 
	$(this).addClass('statusClicked')
	
	console.log(status)
	
	var form ={		
		IdI:id,
		TypeI:type,
		StatusI:status
	}
	
	$.ajax({
		url:'/user/updateStatus',
		method:'post',
		data:form,
		success:function(result){
			
			$('.statusClicked').val(result.ExpStatus)
			$('.statusClicked').removeClass('statusClicked')

			
			},
		error:function(err){
			
			  		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
			
		}
	})
	
	
})





//Save Personal Information

$(document).on('click','.SavePersonalInf',function(){
	
	
	//get inputs
  var FirstI =	$('input[name=FirstNameI]').val();
  var LastI =	$('input[name=LastNameI]').val();
  var JobI =	$('input[name=JobI]').val();  
  var PInfI =	$('textarea[name=PersonalInfI]').val();
  var GenderI =	$('select[name=GenderI]').val();
  var DateI = $('input[name=BirthDateI]').val();
  
  var form = {
  	FirstNameI : FirstI,
  	LastNameI : LastI,
  	JobI : JobI,
  	PersonalInfI : PInfI,
  	GenderI : GenderI,
  	DateI : DateI
  }
  
  
  $.ajax({
  	url:'/User/UpdateInf',
  	method:'post',
  	data:form,
  	success:function(result){
  		console.log(result)
  		  			toastr["success"]("Personal Informations Saved!")

  		
  	},
  	error:function(xhr){
  		
  		  		var arr = xhr.responseJSON.errors;
  		 arr.forEach(function(err){
  				 	toastr["warning"](err.msg)
  		 })
  		
  		
  		
  	}
  	
  })
	
})