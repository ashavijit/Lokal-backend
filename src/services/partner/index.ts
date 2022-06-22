// include address model
const Partner = require('./api/schema/index.ts');
// include user model
const User = require('../user/api/schema/index.ts');

// create a new Partner.
exports.partner_create = function (req, res) {
    // validate request
    if(!req.body.user_id ) {
        return res.status(400).send({
            success: false,
            message: "Please enter required fields-user_id"
        });
    }

    // create a partner
    let partner = new Partner(
        {
            user_id:req.body.user_id,
            referralCode: req.body.referralCode,
            plan_id: req.body.plan_id,
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
            // save partner in the database.
            partner.save()
            .then(
                data => {
                res.send({
                    success: true,
                    message: 'Partner successfully created',
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

// retrieve and return all partners.
exports.all_partner = (req, res) => {
    Partner.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No partners found!";
            else message = 'Partnerss successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving partners."
        });
    });
};

// find a single partner with a id.
exports.partner_details = (req, res) => {
    Partner.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Partner not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Partner successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Partner not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving address with id " + req.params.id
        });
    });
};

// update a partner  by the id.
exports.partner_update = (req, res) => {
    // validate request
    if(!req.body.user_id) {
        return res.status(400).send({
            success: false,
            message: "Please enter required fields user_id"
        });
    }

    // find partner and update
    Partner.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Partner not found with id " + req.params.id
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
                message: "Partner not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating partner with id " + req.params.id
        });
    });
};

// delete a partner with the specified id.
exports.partner_delete = (req, res) => {
    Partner.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Partner not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Partner successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "Partner not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete Partner with id " + req.params.id
        });
    });
};