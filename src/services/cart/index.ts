// include cart model
const Cart = require('./api/schema/index');

// create a new Cart.
exports.cart_create = function (req, res) {
    // validate request
    if(!req.body.status) {
        return res.status(400).send({
            success: false,
            message: "Please enter cart name "
        });
    }

    // create a cart
    let cart = new Cart(
        {
            status: req.body.status,
            billingAddress: req.body.billingAddress,
            total: req.body.total,
        }
    );

    // save cart in the database.
    cart.save()
        .then(data => {
            res.send({
                success: true,
                message: 'Cart successfully created',
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while creating the cart."
        });
    });
};

// retrieve and return all cart.
exports.all_cart= (req, res) => {
    Cart.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No cart found!";
            else message = 'Cart successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while retrieving cart"
        });
    });
};

// find a single cart with a id.
exports.cart_details = (req, res) => {
    Cart.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Cart not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Cart successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Cart not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving cart with id " + req.params.id
        });
    });
};

// update a cart  by the id.
exports.cart_update = (req, res) => {
    // validate request
    if(!req.body.status ) {
        return res.status(400).send({
            success: false,
            message: "Please enter cart name "
        });
    }

    // find cart and update
    Cart.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Cart not found with id " + req.params.id
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
                message: "Cart not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating cart with id " + req.params.id
        });
    });
};

// delete a cart with the specified id.
exports.cart_delete = (req, res) => {
    Cart.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Cart not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Cart successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "Cart not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete cart with id " + req.params.id
        });
    });
};