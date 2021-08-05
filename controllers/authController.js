var express = require('express');
var UserInfoDAO = require('../models/UserInfoDAO');
var jwtmiddle = require('../middlewares/jwt')
var db = require('../config/db')

function signIn(req, res, next) {
	res.render('auth/signIn');
}

function signUp(req,res,next) {
	res.render('auth/signUp');
}
function checkUser(req, res, next) {
    var special_pattern = /[` ~!@#$%^&*|\\\'\";:\/?]/gi;
    
    if(special_pattern.test(req.body.inputID)|| special_pattern.test(req.body.inputPW) ||
        req.body.inputID == undefined || req.body.inputPW == undefined ||
        req.body.inputID == " " || req.body.inputPW == " "||
        req.body.inputID == null || req.body.inputPW == null){
        res.send("<script>alert('잘못된 값을 입력하셨습니다.'); history.go(-1);</script>")
    }else{
        var parameters = {
            "user_id": req.body.inputID,
            "user_pw" : req.body.inputPW
        }
    
        UserInfoDAO.search_UserDetail(parameters).then(
            (db_data) => {
                if(db_data[0] != undefined){
                    var userData = {
                        user_id: db_data[0].user_id
                    }
                    jwtmiddle.jwtCreate(userData).then(
                        (token)=>{
                            res.cookie("user", token);
                            res.redirect("/")
                        }
                      ).catch(err=>res.send("<script>alert('jwt err');</script>"));
                }else{
                    res.send("<script>alert('JWT is wrong...');history.go(-1);</script>")
                }
            }
        ).catch(err=>res.send("<script>alert('"+ err +"');history.go(-1);</script>"))
    }    
}

function revise_check(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission)=>{
            res.render('auth/revise_check', {permission});
        }
    ).catch(err=>res.send("<script>alert('jwt err');</script>"));    
}

module.exports = {
    signIn,
    signUp,
    checkUser,
    revise_check
  }