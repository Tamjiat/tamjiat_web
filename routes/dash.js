var express = require('express');
var router = express.Router();
var dashController = require('../controllers/dashController')


router.get('/',dashController.dash_main);
router.post('/crop', dashController.dash_cropCategoryCount);

router.post('/cropNum',dashController.dash_cropNumber);
router.post('/cropWeek',dashController.dash_cropWeekDate);
router.post('/cropPercent', dashController.dash_cropPercent);
router.post('/cropDetail', dashController.dash_cropDetail);
router.post('/cropCategory', dashController.dash_cropCategory);


router.get('/cropAdd',dashController.dashCropAdd);
router.get('/cropAddForm',dashController.dashCropAddForm);
router.get('/dcropAdd',dashController.dashDCropAdd);
router.get('/dcropAddForm', dashController.dashDCropAddForm);
router.get('/pest',dashController.dashPest);
router.get('/notice',dashController.dashNotice);
router.get('/talk',dashController.dashTalk);

module.exports = router
