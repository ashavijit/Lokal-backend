const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AdminSchema = new Schema({
    accessLevel: {type: String, max: 100, required:true},
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Admin', AdminSchema);