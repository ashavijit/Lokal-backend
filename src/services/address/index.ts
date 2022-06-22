// include address model
const Address = require('./api/schema/index.ts');
// include user model
const User = require('../user/api/schema/index.ts');

// create a new Address.
exports.address_create = function (req, res) {
    // validate request
    if(!req.body.user_id ||!req.body.street1 || !req.body.street2 || !req.body.pincode || !req.body.city || !req.body.state) {
        return res.status(400).send({
            success: false,
            message: "Please enter required fields-user_id,street1,steet2,pincode,city,state"
        });
    }

    // create a address
    let address = new Address(
        {
            user_id:req.body.user_id,
            street1: req.body.street1,
            street2: req.body.street2,
            pincode: req.body.pincode,
            city: req.body.city,
            state:req.body.state,
        }
    );
    
    User.findByIdAndUpdate(req.body.user_id, {
        $push: {addresses : address._id}
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "User not found with id " + req.body.user_id
                });
            }
            // save address in the database.
            address.save()
            .then(
                data => {
                res.send({
                    success: true,
                    message: 'Address successfully created',
                    data: data
                });
            }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while creating the address."
            });
        });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "User not found with id " + req.body.user_id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating user with id " + req.params.id
        });
    });
};

// retrieve and return all addresss.
exports.all_addresss = (req, res) => {
    Address.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No address found!";
            else message = 'Addresss successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving addresss."
        });
    });
};

// find a single address with a id.
exports.address_details = (req, res) => {
    Address.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Address not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Address successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Address not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving address with id " + req.params.id
        });
    });
};

// update a address  by the id.
exports.address_update = (req, res) => {
    // validate request
    if(!req.body.street1 || !req.body.street2 || !req.body.pincode || !req.body.city || !req.body.state) {
        return res.status(400).send({
            success: false,
            message: "Please enter required fields-strret1,steet2,pincode,city,state"
        });
    }

    // find address and update
    Address.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Address not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Address not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating address with id " + req.params.id
        });
    });
};

// delete a address with the specified id.
exports.address_delete = (req, res) => {
    Address.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Address not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Address successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "Address not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete address with id " + req.params.id
        });
    });
};