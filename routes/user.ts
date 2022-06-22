const express = require('express');
const router = express.Router();

// include usercontroller
const user_controller = require('../src/services/user/index.ts');

// routes
router.get('/', user_controller.all_users);
router.post('/create', user_controller.user_create);
router.get('/:id', user_controller.user_details);
router.put('/update/:id', user_controller.user_update);
router.delete('/delete/:id', user_controller.user_delete);

module.exports = router;