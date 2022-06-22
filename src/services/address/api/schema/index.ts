const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AddressSchema = new Schema({
    user_id:{type:Schema.Types.ObjectId, ref:'User', req :true},
    street1: {type: String, required: true, max: 25},
    street2: {type: String, required: true, max: 25},
    landmark: {type: String, max: 50},
    pincode: {type: Number, required: true,min:6},
    block: {type: String, max: 25},
    city: {type: String, required: true,max: 25},
    state: {type: String,required: true, max: 25},
},{
    timestamps:true
});

// Export the model
module.exports = mongoose.model('Address', AddressSchema);