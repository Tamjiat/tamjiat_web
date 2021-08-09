var express = require('express');
var passport = require('passport');
var KakaoStrategy = require('passport-kakao').Strategy;
var indexController = require('../controllers/indexController')
var router = express.Router();

router.use('/auth', require('./auth')); //auth.js 연결
router.use('/weather', require('./weather')); //weaher.js 연결

router.get('/', indexController.getIndex)

router.post('/', indexController.passport_auth)

router.get('/loginSuccess', indexController.loginSuccess)

router.get('/loginFail',indexController.loginSuccess)


module.exports = router
