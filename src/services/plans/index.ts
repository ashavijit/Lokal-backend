// include plans model
const Plans = require('./api/schema/index.ts');

// create a new Plans.
exports.plan_create = function (req, res) {
    // validate request
    if(!req.body.name) {
        return res.status(400).send({
            success: false,
            message: "Please enter plan name "
        });
    }

    // create a plan
    let plan = new Plans(
        {
            name: req.body.name,
            price: req.body.price,
        }
    );

    // save plan in the database.
    plan.save()
        .then(data => {
            res.send({
                success: true,
                message: 'Plan successfully created',
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while creating the plan."
        });
    });
};

// retrieve and return all plans.
exports.all_plans= (req, res) => {
    Plans.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No plan found!";
            else message = 'Plans successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving plan"
        });
    });
};

// find a single plan with a id.
exports.plans_details = (req, res) => {
    Plans.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Plan not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Plan successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Plan not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving plan with id " + req.params.id
        });
    });
};

// update a plan  by the id.
exports.plan_update = (req, res) => {
    // validate request
    if(!req.body.name ) {
        return res.status(400).send({
            success: false,
            message: "Please enter plan name "
        });
    }

    // find plan and update
    Plans.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Plan not found with id " + req.params.id
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
                message: "Plan not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating plan with id " + req.params.id
        });
    });
};

// delete a plan with the specified id.
exports.plan_delete = (req, res) => {
    Plans.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Plan not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Plan successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "Plan not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete plan with id " + req.params.id
        });
    });
};