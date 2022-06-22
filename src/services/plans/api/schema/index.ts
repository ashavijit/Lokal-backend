const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlanSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number},
    duration:{type:String, max:300},
    description:{type:String, max:300},
    discount:{type:String , max:100},
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Plans', PlanSchema);