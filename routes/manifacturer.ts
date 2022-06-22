const express = require('express');
const router = express.Router();

// include manufacturer controller
const manufacturer_controller = require('../src/services/manufacturer/index.ts');

//manufacturers
router.get('/all', manufacturer_controller.all_manufacturers);
router.post('/create', manufacturer_controller.manufacturer_create);
router.get('/:id', manufacturer_controller.manufacturers_details);
router.put('/update/:id',manufacturer_controller.manufacturer_update);
router.delete('/delete/:id', manufacturer_controller.manufacturer_delete);

module.exports = router;