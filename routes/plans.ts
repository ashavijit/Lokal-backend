const express = require('express');
const router = express.Router();

// include plan controller
const plan_controller = require('../src/services/plans/index.ts');

//plans
router.get('/all', plan_controller.all_plans);
router.post('/create', plan_controller.plan_create);
router.get('/:id', plan_controller.plans_details);
router.put('/update/:id',plan_controller.plan_update);
router.delete('/delete/:id', plan_controller.plan_delete);

module.exports = router;