// include sku model
const SKU = require('./api/schema/index');

// create a new SKU.
exports.sku_create = function (req, res) {
    // validate request
    if(!req.body.name) {
        return res.status(400).send({
            success: false,
            message: "Please enter sku serviceType "
        });
    }

    // create a sku
    let sku = new SKU(
        {
            name: req.body.name,
            description: req.body.description,
        }
    );

    // save sku in the database.
    sku.save()
        .then(data => {
            res.send({
                success: true,
                message: 'SKU successfully created',
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while creating the sku."
        });
    });
};

// retrieve and return all skus.
exports.all_skus= (req, res) => {
    SKU.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No sku found!";
            else message = 'SKU successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving sku"
        });
    });
};

// find a single sku with a id.
exports.sku_details = (req, res) => {
    SKU.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "SKU not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'SKU successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "SKU not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving sku with id " + req.params.id
        });
    });
};

// update a sku  by the id.
exports.sku_update = (req, res) => {
    // validate request
    if(!req.body.name) {
        return res.status(400).send({
            success: false,
            message: "Please enter sku serviceType "
        });
    }

    // find sku and update
    SKU.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "SKU not found with id " + req.params.id
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
                message: "SKU not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating sku with id " + req.params.id
        });
    });
};

// delete a sku with the specified id.
exports.sku_delete = (req, res) => {
    SKU.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "SKU not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "SKU successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "SKU not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete sku with id " + req.params.id
        });
    });
};