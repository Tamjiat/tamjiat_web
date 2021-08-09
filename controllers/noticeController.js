var express = require('express');

function notice(req, res, next) {
	res.render('notice');
}

module.exports = {
    notice
}