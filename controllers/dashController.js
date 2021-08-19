var express = require('express');
var CropInfoDAO = require('../models/CropInfoDAO')

//파라미터값에 해당하는 위치의 작물 개수값
function dash_cropCategoryCount(req, res, next) {
  var parameters = {
    "uid": req.body.uid //req.body.uid
  }
	CropInfoDAO.select_cropCategoryCount(parameters).then((db_data) => {
    res.send(db_data);
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

//대쉬보드 메인페이지
function dash_main(req, res, next) {
	res.render('dash_main');
}

module.exports = {
    dash_cropCategoryCount,
    dash_main
}