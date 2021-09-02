var express = require('express');
var router = express.Router();
const upload = require('../middleware/multer');
var dashController = require('../controllers/dashController')

//안드로이드-----------------------------------------
router.post('/crop', dashController.dash_cropCategoryCount);
router.post('/cropNum',dashController.dash_cropNumber);
router.post('/cropWeek',dashController.dash_cropWeekDate);
router.post('/cropPercent', dashController.dash_cropPercent);
router.post('/cropDetail', dashController.dash_cropDetail);
router.post('/cropCategory', dashController.dash_cropCategory);

router.post('/cropMulter', upload.fields([{name:'myFile', maxCount:1}]), dashController.dash_cropMulter)


//웹------------------------------------------------
router.get('/',dashController.dash_main);
router.get('/crop/:num',dashController.dashCrop);
router.get('/cropAdd',dashController.dashCropAdd);
router.get('/cropDetail/:num',dashController.dashCropDetail);
router.post('/cropInsert',dashController.dashinsertCrop);

router.get('/dcrop/:num',dashController.dashDCrop);
router.get('/dcropAdd', dashController.dashDCropAdd);
router.get('/dcropDetail/:num',dashController.dashDCropDetail);
router.post('/dcropInsert',upload.fields([{name:'attachments', maxCount:1}]), dashController.dashinsertDCrop);

router.get('/cropCulture/:num', dashController.dashCropPercent);
router.get('/pest/:num',dashController.dashPest);
router.get('/notice/:num',dashController.dashNotice);
router.get('/noticeDetail',dashController.dashNoticeDetail);
router.get('/noticeInsert',dashController.dashNoticeInsert);
router.get('/talk',dashController.dashTalk);

router.post('/Header',dashController.dashHeader);

module.exports = router
