var express = require('express');
var CropDAO = require('../models/CropDAO');
var DashDAO = require('../models/DashDAO');
var weather = require('../models/weather');
var dayjs =  require('dayjs')

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
  var parameters = {
    "uid": 1234
  }
  DashDAO.select_dashMenuList(parameters).then((db_data)=>{
    console.log(db_data)
    console.log(req.session.userName);
    res.render('dash/main',{ db_data, username : req.session.userName});
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashCrop(req, res, next) {
  var parameters = {
    "uid": 1234
  }
	DashDAO.select_crop(parameters).then((db_data)=> {
      res.render('dash/Crop', {db_data: db_data, c_num : req.params.num, max_value : 9,username : req.session.userName});
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashCropAdd(req, res, next) {
  DashDAO.select_cropCode().then((db_data)=> {
    codeData = db_data
    DashDAO.select_cropCategory().then((db_data)=> {
      categoryData = db_data
      res.render('dash/Crop_add',{codeData, categoryData,username : req.session.userName});
    }).catch(err=>res.send("<script>alert('err')</script>"));
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashCropDetail(req, res, next) {
  var parameters = {
    "cid" : req.params.num,
    "uid": 1234
  }
  DashDAO.select_cropCode().then((db_data)=> {
    codeData = db_data
    DashDAO.select_cropCategory().then((db_data)=> {
      categoryData = db_data
      DashDAO.select_cropDetail(parameters).then((db_data)=> {
        res.render('dash/Crop_detail',{codeData, categoryData, db_data,username : req.session.userName});
      }).catch(err=>res.send("<script>alert('err')</script>"));
    }).catch(err=>res.send("<script>alert('err')</script>"));
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashinsertCrop(req, res, next) {
  parameters ={
    "cropsName": req.body.Cropkind,
    "uid": 1234,
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
  console.log(parameters.cropsCultivar)
    DashDAO.insert_crop(parameters).then((db_data)=> {
      res.redirect('/dash/crop/1')
    }).catch(err=>res.send("<script>alert('err')</script>"));
}
function dashCropPercent(req, res, next) {
  var parameters = {
    "uid": 1234
  }
	DashDAO.select_cropPercent(parameters).then((db_data)=> {
      res.render('dash/Crop_culture', {db_data: db_data , c_num : req.params.num, max_value : 5,username : req.session.userName});
  }).catch(err=>res.send("<script>alert('err')</script>"));
}
function dashDCrop(req, res, next) {
	var parameters = {
    "uid": 1234
  }
  DashDAO.select_dcrop(parameters).then((db_data)=>{
    res.render('dash/DCrop',{db_data,d_num : req.params.num, max_value:5 , dayjs,username : req.session.userName});
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashDCropAdd(req, res, next) {
	DashDAO.select_cropCode().then((db_data)=> {
    codeData = db_data
      res.render('dash/DCrop_add',{codeData,username : req.session.userName});
    }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashinsertDCrop(req, res, next) {
  parameters ={
    "cropsName": req.body.Cropkind,
    "uid": 1234,
    "cropsCultivar" : req.body.CropName,
    "cropsImage" : req.files.attachments[0].filename,
    "cropsMemo" : req.body.cropmemo,
    "AICheck": "진행중",
    "cdName": "검사중"
  }
    DashDAO.insert_dcrop(parameters).then((db_data)=> {
      res.redirect('/dash/dcrop/1')
    }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashDCropDetail(req, res, next) {
  var parameters = {
    "uid": 1234,
    "did": req.params.num
  }
  DashDAO.select_dcropDetail(parameters).then((db_data)=> {
    console.log(db_data)
    res.render('dash/dcrop_detail',{db_data,username : req.session.userName})
  }).catch(err=>res.send("<script>alert('err')</script>"));
}


function dashPest(req, res, next) {
  DashDAO.select_cropDisease().then((db_data)=> {
    res.render('dash/Pest', {db_data, p_num : req.params.num, max_value : 7, dayjs, username : req.session.userName});
  })
}

function dashNotice(req, res, next) {
  DashDAO.select_notice().then((db_data)=> {
    res.render('dash/notice',{db_data, n_num : req.params.num , max_value : 7, username : req.session.userName});
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashNoticeDetail(req, res, next) {
  var parameters = {
    "nid": req.params.num
  }
  DashDAO.select_noticeDetail(parameters).then((db_data)=> {
	  res.render('dash/notice_detail',{db_data, username : req.session.userName});
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashNoticeInsert(req, res, next) {
	res.render('dash/notice_write',{username : req.session.userName});
}
function dashNoticeInsertData(req,res,next){
  var parameters = {
    "nTitle" : req.body.nTitle,
    "nContent" : req.body.nContent,
    "nWriter" : 1234,
  }
  DashDAO.insert_notice(parameters).then((db_data)=> {
    res.redirect('/dash/notice/1')
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashTalk(req, res, next) {
	res.render('dash/talk',{username : req.session.userName});
}

function dashCropCulture(req, res, next) {
	res.render('dash/Crop_culture',{username : req.session.userName});
}

function dash_cropMulter(req, res, next) {
	var parameters = {
    		"imagefile" : req.files
  	}

  var files = req.files
  console.log(files.myFile[0])
  res.send({"message": "success"})
}


function dashHeader(req, res, next){
  var avgPercent = 0
  var nearHavestDate = ""
  var totalYieldPercent = ""
  var totalDiseaseCount = 0
  var damagedCropsCount = 0
  var parameters = {
    "userid": 1234,
    "cropsName" : req.body.cropsName
  }
  DashDAO.select_totalGrowPercent(parameters).then(function(db_data){
    var totalPercent = 0
    //선택 농작물 총 성장률 구하기
    db_data.forEach(element => {
      totalPercent += element.percent;
    });
    avgPercent = Math.round((totalPercent / db_data.length) * 100) / 100

    //가장 가까운 작물 수확예정일
    DashDAO.select_nearHarvestDate(parameters).then(function(db_data){
      nearHavestDate = db_data[0].cropsEnd;
      
      //작물별 총 수확 진행률
      DashDAO.select_totalYieldPercent(parameters).then(function(db_data){
        totalYieldPercent = db_data[0].avgYield;

        //작물별 병 해충 발행건수 및 피해 농작물 종 개수
        DashDAO.select_countDisease_totalCrops(parameters).then(function(db_data){
          totalDiseaseCount = db_data[db_data.length-1].result
          damagedCropsCount = db_data.length -1

          var headerInfo = {
            "avgPercent" : avgPercent,
            "nearHavestDate" : nearHavestDate,
            "totalYieldPercent" : totalYieldPercent,
            "totalDiseaseCount" : totalDiseaseCount,
            "damagedCropsCount" : damagedCropsCount
          }
          res.send({"result": headerInfo})
        })
      })
    })
  })

  
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
    dashinsertDCrop,
    dashCropCulture,
    dashNotice,
    dashNoticeDetail,
    dashNoticeInsert,
    dashNoticeInsertData,
    dashPest,
    dashTalk,
    dashHeader
}
