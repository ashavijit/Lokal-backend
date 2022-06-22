const express=require('express');
var router =express.Router();

const retailer_controller=require('../src/retailer/index');


router.get('/',retailer_controller.all_retailer);
router.get('/:id',retailer_controller.retailer_details);
router.post('/create',retailer_controller.retailer_create);
router.put('/update/:id',retailer_controller.retailer_update);
router.delete('/delete/:id',retailer_controller.retailer_delete);

module.exports=router;