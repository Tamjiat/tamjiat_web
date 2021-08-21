'use strict';
var db = require("../config/db");
var logger = require('../config/logger');

function select_cropCategoryCount(parameters) {
  return new Promise(function (resolve, reject) {
      db.query(`SELECT if(categoryName IS NULL, "합계", categoryName) AS 카테고리, COUNT(categoryName) AS 개수  FROM userCrop WHERE uid = '${parameters.uid}' GROUP BY categoryName WITH ROLLUP`, function (error, db_data) {
          if (error) {
              logger.error(
                  "DB error [usercrop]"+
                  "\n \t" + `SELECT if(categoryName IS NULL, "합계", categoryName) AS 카테고리, COUNT(categoryName) AS 개수  FROM userCrop WHERE uid = '${parameters.uid}' GROUP BY categoryName WITH ROLLUP` +
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

function select_recentDateWeek(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`select if(cropsStart is NULL, "시작날짜", cropsStart) AS 시작날짜, cropsNum AS 품종, TIMESTAMPDIFF(WEEK, cropsStart, NOW()) AS 주차 FROM userCrop WHERE cropsStart >= date_add(now(), interval -1 MONTH) and uid='${parameters.uid} and '${parameters.cropsNum}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [usercrop]"+
                    "\n \t" +`select if(cropsStart is NULL, "시작날짜", cropsStart) AS 시작날짜, cropsNum AS 품종, TIMESTAMPDIFF(WEEK, cropsStart, NOW()) AS 주차 FROM userCrop WHERE cropsStart >= date_add(now(), interval -1 MONTH) and uid='${parameters.uid}' LIMIT 2` +
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

function select_totalCropnumber(parameters) {
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
function select_cropPercent(parameters) {
   return new Promise(function (resolve, reject) {
        db.query(`SELECT if(uid IS NULL, "총개수", uid) AS 회원번호, cropsStart, cropsEnd, ROUND(((TIMESTAMPDIFF(day, cropsStart, NOW())) / (TIMESTAMPDIFF(day, cropsStart, cropsEnd))) * 100) AS 퍼센트  FROM userCrop WHERE uid = '${parameters.uid}' and cropsNum ='${parameters.cropsNum}'`, function (error, db_data) {
            if (error) {
                   logger.error(
                       "DB error [usercrop]"+
                       "\n \t" + `SELECT if(uid IS NULL, "총개수", uid) AS 회원번호, cropsStart, cropsEnd, ROUND(((TIMESTAMPDIFF(day, cropsStart, NOW())) / (TIMESTAMPDIFF(day, cropsStart, cropsEnd))) * 100) AS 퍼센트  FROM userCrop WHERE uid = '${parameters.uid}' and cropsNum ='${parameters.cropsNum}'` +
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

function select_cropDetail(parameters) {
    return new Promise(function (resolve, reject) {
         db.query(`SELECT C.cropsNum, C.cropsName, cropsCultivar, locate , cropsStart FROM userCrop as U JOIN cropCode as C ON C.cropsNum =U.cropsNum WHERE uid = '${parameters.uid}'`, function (error, db_data) {
             if (error) {
                    logger.error(
                        "DB error [usercrop]"+
                        "\n \t" + `SELECT C.cropsNum, C.cropsName, cropsCultivar, locate , cropsStart FROM userCrop as U JOIN cropCode as C ON C.cropsNum =U.cropsNum WHERE uid = '${parameters.uid}'` +
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
    select_cropCategoryCount,
    select_totalCropnumber,
    select_recentDateWeek,
    select_cropPercent,
    select_cropDetail
}