const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use('kakao', new KakaoStrategy({
    clientID: 'ebaf9e6022288f5b6781f31e644e0314',
    callbackURL: '/auth/kakao/callback',     // 위에서 설정한 Redirect URI
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
    console.log(req.user.kakao_account.profile)
    res.render('loginSuccess',{profile : req.user.kakao_account.profile})
});

module.exports = router;