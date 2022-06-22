const express = require('express');
const router = express.Router();

// include usercontroller
const address_controller = require('../src/services/address/index.ts');

// routes
router.get('/', address_controller.all_addresss);
router.post('/create', address_controller.address_create);
router.get('/:id', address_controller.address_details);
router.put('/update/:id', address_controller.address_update);
router.delete('/delete/:id',address_controller.address_delete);

module.exports = router;