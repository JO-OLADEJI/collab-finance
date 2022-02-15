const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.createOne);
router.put('/:id', userController.updateOne);
router.delete('/:id', userController.deletOne);


module.exports = router;