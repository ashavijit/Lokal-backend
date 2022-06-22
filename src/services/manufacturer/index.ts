// include user model
const User = require('../user/api/schema/index');
// include Manufacturer model
const Manufacturer = require('./api/schema/index');

// create a new Manufacturer.
exports.manufacturer_create = function (req, res) {
    // validate request
    if(!req.body.user_id ) {
        return res.status(400).send({
            success: false,
            message: "Please enter required fields-user_id"
        });
    }

    // create a manufacturer
    let manufacturer = new Manufacturer(
        {
            user_id:req.body.user_id,
            type: req.body.type,
            details: req.body.details,
        }
    );
    
    User.findByIdAndUpdate(req.body.user_id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "User not found with id " + req.body.user_id
                });
            }
            // save manufacturer in the database.
            manufacturer.save()
            .then(
                data => {
                res.send({
                    success: true,
                    message: 'Manufacturer successfully created',
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

// retrieve and return all manufacturers.
exports.all_manufacturer = (req, res) => {
    Manufacturer.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No manufacturers found!";
            else message = 'Manufacturers successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving manufacturers."
        });
    });
};

// find a single manufacturer with a id.
exports.manufacturer_details = (req, res) => {
    Manufacturer.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Manufacturer not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Manufacturer successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Manufacturer not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving address with id " + req.params.id
        });
    });
};

// update a manufacturer  by the id.
exports.manufacturer_update = (req, res) => {
    // validate request
    if(!req.body.user_id) {
        return res.status(400).send({
            success: false,
            message: "Please enter required fields user_id"
        });
    }

    // find manufacturer and update
    Manufacturer.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Manufacturer not found with id " + req.params.id
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
                message: "Manufacturer not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating manufacturer with id " + req.params.id
        });
    });
};

// delete a manufacturer with the specified id.
exports.manufacturer_delete = (req, res) => {
    Manufacturer.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Manufacturer not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Manufacturer successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "Manufacturer not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete Manufacturer with id " + req.params.id
        });
    });
};