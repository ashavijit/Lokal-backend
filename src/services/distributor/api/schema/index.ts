const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let distributorSqlSchema=new Schema({
    userID:{type:String,required:true,max:25},
    gst_num:{type:String,required:true,max:25},

},{
    timestamps:true
})

module.exports=mongoose.model('Distributors',distributorSqlSchema);