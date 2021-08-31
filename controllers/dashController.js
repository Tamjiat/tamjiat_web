var express = require('express');
var CropDAO = require('../models/CropDAO');
var DashDAO = require('../models/DashDAO');
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
//---------------------------------웹 


//대쉬보드 메인페이지
function dash_main(req, res, next) {
	res.render('dash/main');
}

function dashCrop(req, res, next) {
  var parameters = {
    "uid": 1234
  }
	DashDAO.select_crop(parameters).then((db_data)=> {
      res.render('dash/Crop', {db_data: db_data, c_num : req.params.num, max_value : 9});
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashCropAdd(req, res, next) {
  DashDAO.select_cropCode().then((db_data)=> {
    codeData = db_data
    DashDAO.select_cropCategory().then((db_data)=> {
      categoryData = db_data
      res.render('dash/Crop_add',{codeData, categoryData});
    }).catch(err=>res.send("<script>alert('err')</script>"));
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashCropDetail(req, res, next) {
  var parameters = {
    "cid" : req.params.num,
    "uid" : 1234
  }
  DashDAO.select_cropCode().then((db_data)=> {
    codeData = db_data
    DashDAO.select_cropCategory().then((db_data)=> {
      categoryData = db_data
      DashDAO.select_cropDetail(parameters).then((db_data)=> {
        res.render('dash/Crop_detail',{codeData, categoryData, db_data});
      }).catch(err=>res.send("<script>alert('err')</script>"));
    }).catch(err=>res.send("<script>alert('err')</script>"));
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashinsertCrop(req, res, next) {
  parameters ={
    "cropsName": req.body.Cropkind,
    "uid" : 1234,
    "cropsCultivar" : req.body.CropName,
    "categoryName" : req.body.CropcategoryName,
    "useCompost" : req.body.useCompost,
    "locate" : req.body.Croplocation,
    "cropsStart" : req.body.cropsStart,
    "cropsEnd" : req.body.cropsEnd,
    "goalYield" : req.body.goalYield,
    "currentYield" : req.body.currentYield,
    "cropsMemo" : req.body.cropmemo
  }
    DashDAO.insert_crop(parameters).then((db_data)=> {
      res.redirect('/dash/crop')
    }).catch(err=>res.send("<script>alert('err')</script>"));
}
function dashCropPercent(req, res, next) {
  var parameters = {
    "uid": 1234
  }
	DashDAO.select_cropPercent(parameters).then((db_data)=> {
      res.render('dash/Crop_culture', {db_data: db_data , c_num : req.params.num, max_value : 5});
  }).catch(err=>res.send("<script>alert('err')</script>"));
}
function dashDCrop(req, res, next) {
	res.render('dash/DCrop');
}

function dashDCropAdd(req, res, next) {
	res.render('dash/DCrop_add');
}

function dashDCropDetail(req, res, next) {
	res.render('dash/DCrop_detail');
}


function dashPest(req, res, next) {
	res.render('dash/Pest');
}

function dashNotice(req, res, next) {
	res.render('dash/notice');
}

function dashTalk(req, res, next) {
	res.render('dash/talk');
}

function dashCropCulture(req, res, next) {
	res.render('dash/Crop_culture');
}

function dash_cropMulter(req, res, next) {
	var parameters = {
    		"imagefile" : req.files
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
    dashCrop,
    dashCropAdd,
    dashCropDetail,
    dashCropPercent,
    dashinsertCrop,
    dashDCrop,
    dashDCropAdd,
    dashDCropDetail,
    dashCropCulture,
    dashNotice,
    dashPest,
    dashTalk
}
