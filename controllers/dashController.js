var express = require('express');
var CropInfoDAO = require('../models/CropInfoDAO')

// 모든 작물의 개수 
function dash_croplocateCount(req, res, next) {
	CropInfoDAO.select_userCropLocate().then((db_data) => {
    res.send(db_data);
  }).catch(err=>res.send("<script>alert('err')</script>"));
}


//파라미터값에 해당하는 위치의 작물 개수값
function dash_cropParamterLocateCount(req, res, next) {
  var parameters = {
    "locate": "하우스" //req.body.locate
  }
	CropInfoDAO.select_userparamterCropLocate(parameters).then((db_data) => {
    res.send(db_data);
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

//대쉬보드 메인페이지
function dash_main(req, res, next) {
	res.render('dash_main');
}

module.exports = {
    dash_croplocateCount,
    dash_cropParamterLocateCount,
    dash_main
}