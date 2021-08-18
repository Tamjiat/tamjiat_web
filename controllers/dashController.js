var express = require('express');
var CropInfoDAO = require('../models/CropInfoDAO')

function dash_croplocateCount(req, res, next) {
	CropInfoDAO.select_userCropLocate().then((db_data) => {
    res.send(db_data);
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dash_cropParamterLocateCount(req, res, next) {
  var parameters = {
    "locate": "하우스"
  }
	CropInfoDAO.select_userparamterCropLocate(parameters).then((db_data) => {
    res.send(db_data);
  }).catch(err=>res.send("<script>alert('err')</script>"));
}

module.exports = {
    dash_croplocateCount,
    dash_cropParamterLocateCount
}