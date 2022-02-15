const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController.js');


router.get('/', groupController.search);
router.post('/', groupController.create);
// router.put('/join/:id', groupController.join);
router.post('/invite/:id', groupController.sendInvite);


module.exports = router;