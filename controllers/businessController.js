var express = require('express');

function business(req, res, next) {
	res.render('business',{username : req.session.userName});
}

module.exports = {
    business
}