var express = require('express');
var router = express.Router();
var dashController = require('../controllers/dashController')

router.get('/crop',dashController.dash_croplocateCount);
router.get('/cropPr', dashController.dash_cropParamterLocateCount);
router.get('/',dashController.dash_main);

module.exports = router
