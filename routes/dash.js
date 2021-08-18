var express = require('express');
var router = express.Router();
var dashController = require('../controllers/dashController')

router.get('/',dashController.dash_croplocateCount);
router.get('/pr', dashController.dash_cropParamterLocateCount);

module.exports = router
