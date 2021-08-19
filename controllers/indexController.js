var express = require('express');

function loginSuccess(req, res, next) {
	res.render('business');
}

function loginFail(req, res, next) {
	res.render('business');
}

function getIndex(req, res, next) {
    var token = req.user;
    if (token == undefined) {
        res.render('index',{username : "손님"});
    }
    else {
        res.render('index',{username : token})
    }
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
