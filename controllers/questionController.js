var express = require('express');

function question(req, res, next) {
	res.render('question',{username : req.session.userName });
}

module.exports = {
  question
}