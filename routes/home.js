const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');


router.all('/', homeController.welcome);


module.exports = router;