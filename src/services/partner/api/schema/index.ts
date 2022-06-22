const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PartnerSchema = new Schema({
    user_id:{type:Schema.Types.ObjectId, ref:'User', req :true},
    referrralCode: {type: String, max: 100},
    plan_id:{type:Schema.Types.ObjectId, ref:'Plan', },
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Partner', PartnerSchema);