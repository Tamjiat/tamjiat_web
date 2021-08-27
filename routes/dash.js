var express = require('express');
var router = express.Router();
const upload = require('../middleware/multer');
var dashController = require('../controllers/dashController')


router.get('/',dashController.dash_main);
router.post('/crop', dashController.dash_cropCategoryCount);

router.post('/cropNum',dashController.dash_cropNumber);
router.post('/cropWeek',dashController.dash_cropWeekDate);
router.post('/cropPercent', dashController.dash_cropPercent);
router.post('/cropDetail', dashController.dash_cropDetail);
router.post('/cropCategory', dashController.dash_cropCategory);


router.post('/cropMulter', upload.single('myFile'), dashController.dash_cropMulter)

router.get('/crop/add',dashController.dashCropAdd);
router.get('/crop/addForm',dashController.dashCropAddForm);
router.get('/dcrop/add',dashController.dashDCropAdd);
router.get('/dcrop/addForm', dashController.dashDCropAddForm);
router.get('/cropCulture', dashController.dashCropCulture);
router.get('/cropCulture/Detail', dashController.dashCropCultureDetail);
router.get('/pest',dashController.dashPest);
router.get('/notice',dashController.dashNotice);
router.get('/talk',dashController.dashTalk);

module.exports = router
