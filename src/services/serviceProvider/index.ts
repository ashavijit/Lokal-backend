// include serviceProviders model
const ServiceProvider = require('./api/schema/index');

// create a new ServiceProvider.
exports.serviceProvider_create = function (req, res) {
    // validate request
    if(!req.body.serviceType) {
        return res.status(400).send({
            success: false,
            message: "Please enter serviceProvider serviceType "
        });
    }

    // create a serviceProvider
    let serviceProvider = new ServiceProvider(
        {
            serviceType: req.body.serviceType,
            name: req.body.name,
            address: req.body.address,
        }
    );

    // save serviceProvider in the database.
    serviceProvider.save()
        .then(data => {
            res.send({
                success: true,
                message: 'ServiceProvider successfully created',
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while creating the serviceProvider."
        });
    });
};

// retrieve and return all serviceProviders.
exports.all_serviceProviders= (req, res) => {
    ServiceProvider.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No serviceProvider found!";
            else message = 'ServiceProvider successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving serviceProvider"
        });
    });
};

// find a single serviceProvider with a id.
exports.serviceProviders_details = (req, res) => {
    ServiceProvider.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "ServiceProvider not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'ServiceProvider successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "ServiceProvider not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving serviceProvider with id " + req.params.id
        });
    });
};

// update a serviceProvider  by the id.
exports.serviceProvider_update = (req, res) => {
    // validate request
    if(!req.body.serviceType ) {
        return res.status(400).send({
            success: false,
            message: "Please enter serviceProvider serviceType "
        });
    }

    // find serviceProvider and update
    ServiceProvider.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "ServiceProvider not found with id " + req.params.id
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
                message: "ServiceProvider not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating serviceProvider with id " + req.params.id
        });
    });
};

// delete a serviceProvider with the specified id.
exports.serviceProvider_delete = (req, res) => {
    ServiceProvider.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "ServiceProvider not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "ServiceProvider successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "ServiceProvider not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete serviceProvider with id " + req.params.id
        });
    });
};