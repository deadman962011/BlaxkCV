 
 

  var skillArr = [];

  // search inside array function 
  function searchArr(arr,val){
  	
  	 for(var i=0; i<arr.length; i++){
       if(arr[i] === val){
         	return i;
       }
       else{
       	  	 	 return true;
       }
  	 }
  }
  

// push skill into array skill
  $(document).on('click','.SkillSelOne',function(){

   var SkillStatus=$(this).data('status');
  	var SkillName=$(this).data('skillname');
  
  var checkArr=searchArr(skillArr,SkillName)

  if(SkillStatus === 0 ){
  	
  	 	skillArr.push(SkillName);  	
  	 	$(this).data('status',1);  	
    	$(this).addClass('SkillSelOneC')

  }
  else{
  	
  	 skillArr.splice(checkArr,1);
  		$(this).removeClass('SkillSelOneC')
   	$(this).data('status',0);  	
  	
  }
  
  //console.log(skillArr)
    		
  })
  
  
  
  
  
  
  
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

  			toastr["info"]("Toaster Working !")