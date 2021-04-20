const mongoose = require('mongoose'); 

//Define a schema 
const Schema = mongoose.Schema;

const CvModel = new Schema({ 

        CVUserId:{type:mongoose.Schema.Types.ObjectId, ref: 'BLCVUser'},
        CVImg:{type:String},
        CVFirstName:{type:String,required:true},
        CVLastName:{type:String,required:true}, 
        CVPersonalInf:{type:String,required:true},
        CVJob:{type:String,required:true},
        CVGender:{type:Number, required:true},
        CVBirthDate:{type:Date,required:true},
        CVExpStatus:{type:Number,default:1},
        CVEduStatus:{type:Number,default:1},
        CVReffStatus:{type:Number,default:0},
        CVTemplate:{type:Number,default:1},
        CVExp:[{type:mongoose.Schema.Types.ObjectId,ref:'BLCVExp'}],
        CVEdu:[{type:mongoose.Schema.Types.ObjectId,ref:'BLCVEdu'}],
        CVSkill:[{type:mongoose.Schema.Types.ObjectId,ref:'BLCVSkill'}],
        CVReff:[{type:mongoose.Schema.Types.ObjectId,ref:'BLCVRef'}],
        CVContact:[{type:mongoose.Schema.Types.ObjectId,ref:'BLCVContact'}]
        
      });
      
 
      
module.exports = mongoose.model('BLCV', CvModel);