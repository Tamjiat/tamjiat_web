var express = require('express');

function loginSuccess(req, res, next) {
	res.render('business');
}

function loginFail(req, res, next) {
	res.render('business');
}

function getIndex(req, res, next) {
    var username = undefined;
	res.render('index', {username : username});
}

function passport_auth(req, res, next) {
    passport.authenticate('local-login', {
        successRedirect : '/loginSuccess',
        failureRedirect : '/loginFail',
        failureFlash : true
    })
}
module.exports = {
    loginFail,
    loginSuccess,
    getIndex,
    passport_auth
}