const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CartSchema = new Schema({
    status: {type: String, required: true, max: 100},
    billingAddress:{type:String, max:300},
    appliedCoupon:{type:String, max:300},
    total:{type:String , max:100},
    ShippingInfo:{type:String , max:100},
    lineItems:[{type:String , max:100}],
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Cart', CartSchema);