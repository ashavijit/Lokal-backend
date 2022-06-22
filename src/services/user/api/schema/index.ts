const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstname: {type: String, required: true, max: 25},
    lastname: {type: String, required: true, max: 25},
    email: {type: String, required: true, max: 50},
    mobileNo: {type: Number, required: true,min:10},
    addresses: [{type:Schema.Types.ObjectId, ref:'Address'}],
    block: {type: String, max: 25},
    distinct: {type: String, max: 25},
    aadhar_card: {type: String, max: 25},
    pan_card: {type: String, max: 25},
    lat: {type: String, max: 25},
    log: {type: String, max: 25},
    role: {type: String, max: 25},
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('User', UserSchema);