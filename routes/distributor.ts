const express =require('express');
var router =express.Router();

const distributor_controller=require('../src/distributor/index');

//routes
router.get('/',distributor_controller.all_distributor);
router.get('/:id',distributor_controller.distributor_details);
router.post('/create',distributor_controller.distributor_create);
router.put('/update/:id',distributor_controller.distributor_update);
router.delete('/delete/:id',distributor_controller.distributor_delete);

module.exports=router;

