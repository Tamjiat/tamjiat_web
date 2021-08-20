var express = require('express');
var cropTotalNumber = require('../models/CropTotalNumberDAO');
var cropDateWeek = require('../models/CropsRecentDateWeekDAO');


function loginSuccess(req, res, next) {
	res.render('business');
}

function loginFail(req, res, next) {
	res.render('business');
}

function cropNumber(req, res, next) {
    var parameters = {
        "uid": req.body.uid //req.body.uid
    }
    //console.log(parameters.uid);
    cropTotalNumber.totalCropnumber(parameters).then(function (db_data){
        console.log(db_data)
        res.json(db_data)
    }).catch(err=>res.send("<script>alert('err')</script>"));
}

function cropWeekDate(req, res, next) {
    var parameters = {
        "uid": req.body.uid //req.body.uid
    }
    //console.log(parameters.uid);
    cropDateWeek.recentDateWeek(parameters).then(function (db_data){
        console.log(db_data)
        res.json(db_data)
    }).catch(err=>res.send("<script>alert('err')</script>"));
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
    passport_auth,
    cropNumber,
    cropWeekDate
}
