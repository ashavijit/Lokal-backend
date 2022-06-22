const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name:{type:String, max:300},
    description:{type:String, max:300},
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Category', CategorySchema);