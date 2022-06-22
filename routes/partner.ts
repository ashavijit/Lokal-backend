const express = require('express');
const router = express.Router();

// include usercontroller
const partner_controller = require('../src/services/partner/index.ts');

// routes
router.get('/', partner_controller.all_partner);
router.post('/create', partner_controller.partner_create);
router.get('/:id', partner_controller.partner_details);
router.put('/update/:id', partner_controller.partner_update);
router.delete('/delete/:id',partner_controller.partner_delete);

module.exports = router;