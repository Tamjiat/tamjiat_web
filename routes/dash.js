var express = require('express');
var router = express.Router();
const upload = require('../middleware/multer');
var dashController = require('../controllers/dashController')


router.get('/',dashController.dash_main);
router.post('/crop', dashController.dash_cropCategoryCount);



//안드로이드
router.post('/cropNum',dashController.dash_cropNumber);
router.post('/cropWeek',dashController.dash_cropWeekDate);
router.post('/cropPercent', dashController.dash_cropPercent);
router.post('/cropDetail', dashController.dash_cropDetail);
router.post('/cropCategory', dashController.dash_cropCategory);

router.post('/cropMulter', upload.single('myFile'), dashController.dash_cropMulter)


//웹
router.get('/crop',dashController.dashCrop);
router.get('/cropAdd',dashController.dashCropAdd);
router.get('/cropDetail',dashController.dashCropDetail);
router.post('/cropInsert',dashController.dashinsertCrop);


router.get('/dcrop',dashController.dashDCrop);
router.get('/dcropAdd', dashController.dashDCropAdd);
router.get('/dcropDetail',dashController.dashDCropDetail);


router.get('/cropCulture', dashController.dashCropCulture);
router.get('/pest',dashController.dashPest);
router.get('/notice',dashController.dashNotice);
router.get('/talk',dashController.dashTalk);

module.exports = router
