var express = require('express');
var userDao = require('../models/userDAO');

function signUp(req, res, next) {

    var parameters = {
        "id": req.session.userid,
        "name" : req.session.userName,
        "img" : req.session.img,
        "email": req.session.email,
        "token" : "0"
    }

    userDao.insert_userInfo(parameters).then(function (db_data){
        console.log(db_data)
        res.render('index',{username : req.session.userName})
    }).catch(err=>res.send("<script>alert('err')</script>"));

}

function updateUser(req, res, next) {

    var parameters = {
        "id": req.session.userid,
        "name" : req.session.userName,
        "img" : req.session.img,
        "email": req.session.email,
        "token" : "0"
    }

    userDao.update_userInfo(parameters).then(function (db_data){
        console.log(db_data)
        console.log("업데이트 성공");
        res.render('index',{username : req.session.userName})
    }).catch(err=>res.send("<script>alert('err')</script>"));

}

function findUser(req, res, next) {
    var parameters = {
        "id": req.session.userid
    }

    userDao.select_userFind(parameters).then(function (db_data){
        console.log(db_data)

        if(db_data.length == 0){
            console.log('존재하지 않는 회원입니다. 회원가입 라우터로 이동합니다.')
            res.redirect('/auth/signUpUser')
        }else{
            console.log('이미 존재하는 회원입니다.')
            res.redirect('/auth/updateUser')
        }
    }).catch(err=>res.send("<script>alert('err')</script>"));

}

function findUserA(req, res, next) {

    req.session.userid = req.body.userid,
    req.session.userName = req.body.userName,
    req.session.img = req.body.img,
    req.session.email = req.body.email

    var parameters = {
        "id": req.session.userid
    }

    userDao.select_userFind(parameters).then(function (db_data){
        console.log(db_data)

        if(db_data.length == 0){
            console.log('존재하지 않는 회원입니다. 회원가입 라우터로 이동합니다.')
            res.redirect('/auth/signUpUser')
        }else{
            console.log('이미 존재하는 회원입니다.')
            res.redirect('/auth/updateUser')
        }
    }).catch(err=>res.send("<script>alert('err')</script>"));

}

module.exports = {
    signUp,
    findUser,
    updateUser,
    findUserA,
}