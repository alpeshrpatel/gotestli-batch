var mongoose=require('mongoose');
var model=mongoose.Schema;

var auditModel=new model({
    //_id (uuid) will be self generated in mongo collection
    //but here we have to suppress the _id
    //In order to suppress _id, set it to false in the model, as follows
    _id:false,
    createdBy:{type:String,default:'System'},
    updatedBy:{type:String,default:'System'}
},{
    timestamps:true
});

//in order to reference the schema, export as follows..
module.exports = auditModel;
//and not as 
//module.exports=mongoose.model('Audit',auditModel);