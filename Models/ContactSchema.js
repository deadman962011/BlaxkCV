const mongoose = require('mongoose'); 

//Define a schema 
const Schema = mongoose.Schema;

const CvSContact = new Schema({ 

        CVId: {type: mongoose.Schema.Types.ObjectId, ref: 'BLCV'},
        CFb:{type:String,required:true},
        CTw:{type:String,required:true}, 
        CInsta:{type:String,required:true},
        CTt:{type:String,required:true},
        CLin:{type:String,required:true},
        CMail:{type:String,required:true}
      });
      
module.exports = mongoose.model('BLCVContact', CvSContact);