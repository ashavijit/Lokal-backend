// include categorys model
const Category = require('./api/schema/index');

// create a new Category.
exports.category_create = function (req, res) {
    // validate request
    if(!req.body.name) {
        return res.status(400).send({
            success: false,
            message: "Please enter category serviceType "
        });
    }

    // create a category
    let category = new Category(
        {
            name: req.body.name,
            description: req.body.description,
        }
    );

    // save category in the database.
    category.save()
        .then(data => {
            res.send({
                success: true,
                message: 'Category successfully created',
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while creating the category."
        });
    });
};

// retrieve and return all categorys.
exports.all_categorys= (req, res) => {
    Category.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No category found!";
            else message = 'Category successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving category"
        });
    });
};

// find a single category with a id.
exports.category_details = (req, res) => {
    Category.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Category successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving category with id " + req.params.id
        });
    });
};

// update a category  by the id.
exports.category_update = (req, res) => {
    // validate request
    if(!req.body.name) {
        return res.status(400).send({
            success: false,
            message: "Please enter category serviceType "
        });
    }

    // find category and update
    Category.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Category not found with id " + req.params.id
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
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating category with id " + req.params.id
        });
    });
};

// delete a category with the specified id.
exports.category_delete = (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Category successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete category with id " + req.params.id
        });
    });
};