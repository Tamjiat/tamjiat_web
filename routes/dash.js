var express = require('express');
var router = express.Router();
var dashController = require('../controllers/dashController')

router.get('/',dashController.dash_main);
router.post('/crop', dashController.dash_cropCategoryCount);

module.exports = router
