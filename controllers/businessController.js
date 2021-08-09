var express = require('express');

function business(req, res, next) {
	res.render('business');
}

module.exports = {
    business
}