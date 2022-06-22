// include Admin model
const Admin = require('./api/schema/index');

// create a new Admin.
exports.admin_create = function (req, res) {
    // validate request
    if(!req.body.accessLevel ) {
        return res.status(400).send({
            success: false,
            message: "Please enter required fields-accessLevel"
        });
    }

    // create a admin
    let admin = new Admin(
        {
            accessLevel:req.body.accessLevel,
        }
    );
    // save admin in the database.
    admin.save()
     .then(data => {
         res.send({
             success: true,
             message: 'admin successfully created',
             data: data
         });
     }).catch(err => {
     res.status(500).send({
         success: false,
         message: err.message || "Some error occurred while creating the admin."
     });
 });
};

// retrieve and return all admins.
exports.all_admin = (req, res) => {
    Admin.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No admins found!";
            else message = 'Admins successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving admins."
        });
    });
};

// find a single admin with a id.
exports.admin_details = (req, res) => {
    Admin.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Admin not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Admin successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Admin not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving address with id " + req.params.id
        });
    });
};

// update a admin  by the id.
exports.admin_update = (req, res) => {
    // validate request
    if(!req.body.accessLevel) {
        return res.status(400).send({
            success: false,
            message: "Please enter required fields user_id"
        });
    }

    // find admin and update
    Admin.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Admin not found with id " + req.params.id
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
                message: "Admin not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating admin with id " + req.params.id
        });
    });
};

// delete a admin with the specified id.
exports.admin_delete = (req, res) => {
    Admin.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Admin not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Admin successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "Admin not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete Admin with id " + req.params.id
        });
    });
};