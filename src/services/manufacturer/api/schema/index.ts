const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ManufacturerSchema = new Schema({
    user_id:{type:Schema.Types.ObjectId, ref:'User', req :true},
    type: {type: String, max: 100},
    details:{type: String, max: 100},
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Manufacturer', ManufacturerSchema);