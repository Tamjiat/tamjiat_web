'use strict';
var db = require("../config/db");
var logger = require('../config/logger');

function select_cropCategoryCount(parameters) {
  return new Promise(function (resolve, reject) {
      db.query(`SELECT if(categoryName IS NULL, "total", categoryName) AS category, COUNT(categoryName) AS count  FROM userCrop WHERE uid = '${parameters.uid}' GROUP BY categoryName WITH ROLLUP`, function (error, db_data) {
          if (error) {
              logger.error(
                  "DB error [usercrop]"+
                  "\n \t" + `SELECT if(categoryName IS NULL, "total", categoryName) AS category, COUNT(categoryName) AS count  FROM userCrop WHERE uid = '${parameters.uid}' GROUP BY categoryName WITH ROLLUP` +
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
        db.query(`select if(uc.cropsStart is NULL, "startDate", uc.cropsStart) AS startDate, cc.cropsName AS cropName, TIMESTAMPDIFF(WEEK, uc.cropsStart, NOW()) AS "month" FROM userCrop AS uc, cropCode AS cc WHERE uc.cropsStart >= date_add(now(), interval -1 MONTH) and uc.uid='${parameters.uid}' and uc.cropsNum = cc.cropsNum LIMIT 2`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [usercrop]"+
                    "\n \t" +`select if(uc.cropsStart is NULL, "startDate", uc.cropsStart) AS startDate, cc.cropsName AS cropName, TIMESTAMPDIFF(WEEK, uc.cropsStart, NOW()) AS "month" FROM userCrop AS uc, cropCode AS cc WHERE uc.cropsStart >= date_add(now(), interval -1 MONTH) and uc.uid='${parameters.uid}' and uc.cropsNum = cc.cropsNum LIMIT 2` +
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
        db.query(`SELECT uid AS userID, COUNT(uid) AS totalNum FROM userCrop WHERE uid = '${parameters.uid}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [usercrop]"+
                    "\n \t" + `SELECT if(uid IS NULL, "총개수", uid) AS 회원번호, COUNT(uid) AS 개수 FROM userCrop WHERE uid = '${parameters.uid}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            else{
                resolve(db_data[0]);
            }
        });
    })
}
function select_cropPercent(parameters) {
   return new Promise(function (resolve, reject) {
        db.query(`SELECT uid AS userID, cropsStart, cropsEnd, ROUND(((TIMESTAMPDIFF(day, cropsStart, NOW())) / (TIMESTAMPDIFF(day, cropsStart, cropsEnd))) * 100) AS percent  FROM userCrop WHERE uid = '${parameters.uid}' and cropsNum IN (SELECT cropsNum FROM cropCode WHERE cropsName = '${parameters.cropsName}')`, function (error, db_data) {
            if (error) {
                   logger.error(
                       "DB error [usercrop]"+
                       "\n \t" + `SELECT uid AS userID, cropsStart, cropsEnd, ROUND(((TIMESTAMPDIFF(day, cropsStart, NOW())) / (TIMESTAMPDIFF(day, cropsStart, cropsEnd))) * 100) AS percent  FROM userCrop WHERE uid = '${parameters.uid}' and cropsNum IN (SELECT cropsNum FROM cropCode WHERE cropsName = '${parameters.cropsName}')` +
                       "\n \t" + error);
                   reject('DB ERR');
                   //throw error;
               }
               else{
                   resolve(db_data[0]);
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

 function select_cropCategory(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT uc.cropsNum, cc.cropsName FROM userCrop AS uc, cropCode AS cc WHERE uc.cropsNum = cc.cropsNum AND uc.uid = ${parameters.uid} GROUP BY uc.cropsNum`, function (error, db_data) {
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
    select_cropDetail,
    select_cropCategory
}