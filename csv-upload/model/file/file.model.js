//---add file model for updating filr status


var mongoose=require('mongoose');
var model=mongoose.Schema;

var auditModel=require('../audit.model');

var fileModel=new model({
    //_id (uuid) will be self generated in mongo collection
    //userId and email are required 
    fileName:String,
    filePath:String,
    userId:String,
    
    status:{type:Number,default:0},

    //to always include auditing, set default:auditModel
    audit:{type:auditModel,default:auditModel}
});

module.exports=mongoose.model('File',fileModel);
