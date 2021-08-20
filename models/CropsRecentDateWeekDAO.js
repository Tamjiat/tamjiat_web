'use strict';
var db = require("../config/db");
var logger = require('../config/logger');

function recentDateWeek(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(        `select if(cropsStart is NULL, "시작날짜", cropsStart) AS 시작날짜, cropsNum AS 품종, TIMESTAMPDIFF(WEEK, cropsStart, NOW()) AS 주차 FROM userCrop WHERE cropsStart >= date_add(now(), interval -1 MONTH) and uid='${parameters.uid}' LIMIT 2`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [usercrop]"+
                    "\n \t" +         `select if(cropsStart is NULL, "시작날짜", cropsStart) AS 시작날짜, cropsNum AS 품종, TIMESTAMPDIFF(WEEK, cropsStart, NOW()) AS 주차 FROM userCrop WHERE cropsStart >= date_add(now(), interval -1 MONTH) and uid='${parameters.uid}' LIMIT 2` +
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
    recentDateWeek
}