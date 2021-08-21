var express = require('express');
var CropDAO = require('../models/CropDAO')
//파라미터값에 해당하는 위치의 작물 개수값
function dash_cropCategoryCount(req, res, next) {
  var parameters = {
    "uid": req.body.uid //req.body.uid
  }
	CropDAO.select_cropCategoryCount(parameters).then((db_data) => {
    res.send(db_data);
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

//대쉬보드 메인페이지
function dash_main(req, res, next) {
	res.render('dash_main');
}

function dash_cropNumber(req, res, next) {
  var parameters = {
      "uid": req.body.uid //req.body.uid
  }
  //console.log(parameters.uid);
  CropDAO.select_totalCropnumber(parameters).then(function (db_data){
      console.log(db_data)
      res.json(db_data)
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dash_cropWeekDate(req, res, next) {
  var parameters = {
      "uid": req.body.uid //req.body.uid
  }
  //console.log(parameters.uid);
  CropDAO.select_recentDateWeek(parameters).then(function (db_data){
      console.log(db_data)
      res.json(db_data)
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dash_cropPercent(req, res, next) {
  var parameters = {
      "uid": req.body.uid ,
      "cropsNum": req.body.cropsNum
  }
  //console.log(parameters.uid);
  CropDAO.select_cropPercent(parameters).then(function (db_data){
      console.log(db_data)
      res.json(db_data)
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dash_cropDetail(req, res, next) {
  var parameters = {
      "uid": req.body.uid
  }
  //console.log(parameters.uid);
  CropDAO.select_cropDetail(parameters).then(function (db_data){
      console.log(db_data)
      res.json(db_data)
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

module.exports = {
    dash_cropCategoryCount,
    dash_main,
    dash_cropWeekDate,
    dash_cropNumber,
    dash_cropPercent,
    dash_cropDetail
}