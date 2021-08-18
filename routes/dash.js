var express = require('express');
var router = express.Router();
var dashController = require('../controllers/dashController')

router.get('/',dashController.dash_main);

module.exports = router
