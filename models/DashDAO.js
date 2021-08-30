'use strict';
var db = require("../config/db");
var logger = require('../config/logger');

function select_crop(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT cid, cropsName, cropsCultivar,cropsStart, cropsEnd, cropsMemo FROM userCrop AS u JOIN cropCode AS c ON c.cropsNum =u.cropsNum and uid = '${parameters.uid}';`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `SELECT cid,c.cropsName, cropsCultivar,cropsStart, cropsEnd, cropsMemo FROM userCrop AS u JOIN cropCode AS c ON c.cropsNum =u.cropsNum and uid = 1234;` +
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

function select_cropCode() {
  return new Promise(function (resolve, reject) {
      db.query(`SELECT * FROM cropCode`, function (error, db_data) {
          if (error) {
              logger.error(
                  "DB error [cropCode]"+
                  "\n \t" + `SELECT * FROM cropCode` +
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
function select_cropCategory() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM cropCategory`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [cropCategory]"+
                    "\n \t" + `SELECT * FROM cropCategory` +
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


function insert_crop(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`INSERT INTO userCrop SET uid = '${parameters.uid}' , cropsNum = '${parameters.cropsNum}', categoryName = '${parameters.categoryName}', cropsCultivar = '${parameters.cropseCultivar}',
         locate = '${parameters.locate}', useCompost = '${parameters.useCompost}', cropsStart='${parameters.cropsStart}', cropsEnd = '${parameters.cropsEnd}', goalYield = '${parameters.goalYield}',
         currentYield = '${parameters.currentYield}', cropsMemo = '${parameters.cropsMemo}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `INSERT INTO userCrop SET uid = '${parameters.uid}' , cropsNum = '${parameters.cropsNum}', categoryName = '${parameters.categoryName}', cropsCultivar = '${parameters.cropseCultivar}',
                    locate = '${parameters.locate}', useCompost = '${parameters.useCompost}', cropsStart='${parameters.cropsStart}', cropsEnd = '${parameters.cropsEnd}', goalYield = '${parameters.goalYield}',
                    currentYield = '${parameters.currentYield}', cropsMemo = '${parameters.cropsMemo}'` +
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
  select_crop,
  select_cropCode,
  insert_crop,
  select_cropCategory
}