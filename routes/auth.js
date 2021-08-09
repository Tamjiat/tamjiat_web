/*
    * 카카오 로그인 인증 부
    *
    * @author 김민수
    * @version 1.0.0
    * @see 김득회, 이규환
    * 작성일 2021-08-09
*/

const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;
var authController = require('../controllers/authController')

/*
    * @brief : 카카오 서버로 검증 부분
    * @date: 2021-08-09
    * @done(null, userInfo) : 카카오 서버로 부터 콜백 호출 받음, 첫번째 인자는 오류 값 부분이므로 null, 두번째는 전달한 정보(유저 정보)
    * clientID : 카카오 RESTful API 키 (나중에 득회껄로 바꿔야 함)
    * callbackURL : 카카오 디벨로퍼에서 설정한 Redirect URI
*/
passport.use('kakao', new KakaoStrategy({
    clientID: 'ebaf9e6022288f5b6781f31e644e0314',
    callbackURL: '/auth/kakao/callback',
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    console.log(accessToken);
    console.log(refreshToken);
    return done(null, profile._json);
}))

passport.serializeUser(function (user, done) {
    console.log('passport session save: ', user.id);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('passport session get id: ', id);
    done(null, id);
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    console.log(req.user.kakao_account.profile.nickname)
    res.render('index',{username : req.user.kakao_account.profile.nickname})
});

module.exports = router;