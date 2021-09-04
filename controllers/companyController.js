var express = require('express');

function company(req, res, next) {
	res.render('company',{username : req.session.userName});
}

module.exports = {
    company
}