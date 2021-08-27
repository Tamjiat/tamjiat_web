var express = require('express');
var CropDAO = require('../models/CropDAO')
var weather = require('../models/weather');

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
      "cropsName": req.body.cropsName
  }
  var lat = req.body.lat;
  var lon = req.body.lon;
  //console.log(parameters.uid);
  CropDAO.select_cropPercent(parameters).then((db_data)=> {
      console.log(db_data)
      weather.getWeatherAPI(lat,lon).then((body)=> {
        let info = JSON.parse(body);
        console.log('현재 온도: ' + info['current']['temp']);
        console.log('현재 습도: ' + info['current']['humidity']);
        console.log('현재 풍속: ' + info['current']['wind_speed']);

        const weather = new Object();
        weather.temp = Math.ceil(info['current']['temp'])
        weather.humidity = Math.ceil(info['current']['humidity'])
        weather.windSpeed = Math.ceil(info['current']['wind_speed'])
        res.send({"cropPercent" : db_data, "weather": weather})

    }).catch(err=>res.send("<script>alert('weather err')</script>"));
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

function dash_cropCategory(req, res, next) {
	var parameters = {
    "uid": req.body.uid
  }
  CropDAO.select_cropCategory(parameters).then(function (db_data){
    res.json(db_data)
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashCropAdd(req, res, next) {
	res.render('dash_Crop_add');
}

function dashCropAddForm(req, res, next) {
	res.render('dash_Crop_add_form');
}

function dashDCropAdd(req, res, next) {
	res.render('dash_DCrop_add');
}

function dashDCropAddForm(req, res, next) {
	res.render('dash_DCrop_add_form');
}


function dashPest(req, res, next) {
	res.render('dash_Pest');
}

function dashNotice(req, res, next) {
	res.render('dash_notice');
}

function dashTalk(req, res, next) {
	res.render('dash_talk');
}

function dash_cropMulter(req, res, next) {
	var parameters = {
    "imagefile" : req.body.files
  }
  res.send('success')
}


module.exports = {
    dash_cropCategoryCount,
    dash_main,
    dash_cropWeekDate,
    dash_cropNumber,
    dash_cropPercent,
    dash_cropDetail,
    dash_cropCategory,
    dash_cropMulter,
    dashCropAdd,
    dashCropAddForm,
    dashDCropAdd,
    dashDCropAddForm,
    dashNotice,
    dashPest,
    dashTalk
}