const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SKUSchema = new Schema({
    name: {type: String, required: true, max: 25},
    description: {type: String, max: 25},
    weight: {type: String, max: 50},
    priceData: {type: Number,min:10},
    categoryIds: [{type:Schema.Types.ObjectId, ref:'Category'}],
    variants: {type: String, max: 25},
    options: {type: String, max: 25},
    pageURL: {type: String, max: 25},
    discount: {type: String, max: 25},
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('SKU', SKUSchema);