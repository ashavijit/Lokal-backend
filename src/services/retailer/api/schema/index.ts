const mongoose = require('mongoose');
const Schema=mongoose.Schema;


let RetailerSchema = new Schema({
    userID: {type:String,required:true,max:30},
    gst_num : {type:Number,required:true,max:25},
    address : {type:String,required:true,max:100},
},{
    timestamps: true
});

module.exports=mongoose.model('Retailers',RetailerSchema);