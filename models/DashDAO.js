'use strict';
var db = require("../config/db");
var logger = require('../config/logger');

function select_crop(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT cid, cropsName, cropsCultivar,cropsStart, cropsEnd, cropsMemo FROM userCrop WHERE uid = '${parameters.uid}';`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `SELECT cid,c.cropsName, cropsCultivar,cropsStart, cropsEnd, cropsMemo FROM userCrop WHERE uid = 1234;` +
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
        db.query(`SELECT * FROM userCrop WHERE cid = '${parameters.cid}' and uid = '${parameters.uid}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `SELECT * FROM userCrop WHERE cid = '${parameters.cid}' and uid = '${parameters.uid}'` +
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
        db.query(`INSERT INTO userCrop SET uid = '${parameters.uid}' , cropsName = '${parameters.cropsName}', categoryName = '${parameters.categoryName}', cropsCultivar = '${parameters.cropCultivar}',
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
  function select_cropPercent(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT cid, cropsName, cropsCultivar, 
        ROUND(((TIMESTAMPDIFF(DAY, cropsStart, NOW()))/(TIMESTAMPDIFF(DAY, cropsStart, cropsEnd))) * 100) AS percent 
        ,cropsStart, cropsEnd FROM userCrop WHERE uid = '${parameters.uid}';`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `SELECT cid, cropsName, cropsCultivar, 
                    ROUND(((TIMESTAMPDIFF(DAY, cropsStart, NOW()))/(TIMESTAMPDIFF(DAY, cropsStart, cropsEnd))) * 100) AS percent 
                    ,cropsStart, cropsEnd FROM userCrop WHERE uid = '${parameters.uid}'` +
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

  function select_dcrop() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM userDcrop`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDcrop]"+
                    "\n \t" + `SELECT * FROM userDcrop` +
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
  function select_dcropDetail(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT ud.did, ud.cropsName, ud.cropsCultivar, ud.AICheck, ud.cdName, ud.cropsImage, cd.cdSolution, ud.cropsDate, ud.cropsMemo FROM userDcrop 
        as ud JOIN diseaseCode as cd ON cd.cdName = ud.cdName WHERE ud.uid = '${parameters.uid}' and ud.did = '${parameters.did}';`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDcrop]"+
                    "\n \t" + `SELECT ud.did, ud.cropsName, ud.cropsCultivar, ud.AICheck, ud.cdName, cd.cdSolution, ud.cropsDate, ud.cropsMemo FROM userDcrop
                     as ud JOIN diseaseCode as cd ON cd.cdName = ud.cdName WHERE ud.uid = '${parameters.uid}';` +
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

  function insert_dcrop(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`INSERT INTO userDcrop SET uid = '${parameters.uid}' , cropsName = '${parameters.cropsName}', cropsCultivar = '${parameters.cropsCultivar}',
          cropsImage = '${parameters.cropsImage}', cropsDate=NOW(), cropsMemo = '${parameters.cropsMemo}' , AICheck = '${parameters.AICheck}', cdName = '${parameters.cdName}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDcrop]"+
                    "\n \t" + `INSERT INTO userDcrop SET uid = '${parameters.uid}' , cropsName = '${parameters.cropsName}', cropsCultivar = '${parameters.cropsCultivar}',
                    cropsImage = '${parameters.cropsImage}', cropsDate=NOW(), cropsMemo = '${parameters.cropsMemo}' , AICheck = '${parameters.AICheck}', cdName = '${parameters.cdName}'` +
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

  function select_cropDisease() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM userCropDisease`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCropDisease]"+
                    "\n \t" + `SELECT * FROM userCropDisease` +
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
  function select_notice() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM notice`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [notice]"+
                    "\n \t" + `SELECT * FROM notice` +
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
  select_cropDetail,
  select_cropCode,
  select_cropDisease,
  insert_crop,
  insert_dcrop,
  select_cropCategory,
  select_cropPercent,
  select_dcrop,
  select_dcropDetail,
  select_notice
}