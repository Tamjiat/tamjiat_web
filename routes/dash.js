var express = require('express');
var router = express.Router();
var dashController = require('../controllers/dashController')


router.get('/',dashController.dash_main);
router.post('/crop', dashController.dash_cropCategoryCount);

router.post('/cropNum',dashController.dash_cropNumber);
router.post('/cropWeek',dashController.dash_cropWeekDate);
router.post('/cropPercent', dashController.dash_cropPercent);
router.post('/cropDetail', dashController.dash_cropDetail);


router.get('/cropAdd',dashController.dash_main);
router.get('/dcropAdd',dashController.dash_main);
router.get('/pest',dashController.dash_main);
router.get('/notice',dashController.dash_main);
router.get('/talk',dashController.dash_main);

module.exports = router
