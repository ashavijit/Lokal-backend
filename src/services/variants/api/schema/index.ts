//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

let VariantsSchema = new Schema({
    skuIds: {type:Schema.Types.ObjectId, ref:'SKU'},
    variantName: {type: String, required: true, max: 25},
    skuName: {type: String, max: 25},
    choices: {type: String, max: 50},
    categoryIds: [{type:Schema.Types.ObjectId, ref:'Category'}],
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Variants', VariantsSchema);