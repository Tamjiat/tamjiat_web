'use strict';
var db = require("../config/db");
var logger = require('../config/logger');

function totalCropnumber(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT if(uid IS NULL, "총개수", uid) AS 회원번호, COUNT(uid) AS 개수 FROM userCrop WHERE uid = '${parameters.uid}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [usercrop]"+
                    "\n \t" + `SELECT if(uid IS NULL, "총개수", uid) AS 회원번호, COUNT(uid) AS 개수 FROM userCrop WHERE uid = '${parameters.uid}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            else{
                resolve(db_data);
            }
        });
    })
}
module.exports = {
    totalCropnumber
}