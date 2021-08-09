var express = require('express');
var router = express.Router();
var noticeController = require('../controllers/noticeController')

router.get('/',noticeController.notice);

module.exports = router