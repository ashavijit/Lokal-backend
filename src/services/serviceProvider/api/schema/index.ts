const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ServiceProviderSchema = new Schema({
    serviceType: {type: String, required: true, max: 100},
    name:{type:String, max:300},
    address:{type:String, max:300},
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);