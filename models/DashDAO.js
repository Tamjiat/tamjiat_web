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
        db.query(`INSERT INTO userCrop SET uid = '${parameters.uid}' , cropsName = '${parameters.cropsName}', categoryName = '${parameters.categoryName}', cropsCultivar = '${parameters.cropsCultivar}',
         locate = '${parameters.locate}', useCompost = '${parameters.useCompost}', cropsStart='${parameters.cropsStart}', cropsEnd = '${parameters.cropsEnd}', goalYield = '${parameters.goalYield}',
         currentYield = '${parameters.currentYield}', cropsMemo = '${parameters.cropsMemo}, cropsFinish = 'false'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `INSERT INTO userCrop SET uid = '${parameters.uid}' , cropsName = '${parameters.cropsName}', categoryName = '${parameters.categoryName}', cropsCultivar = '${parameters.cropCultivar}',
                    locate = '${parameters.locate}', useCompost = '${parameters.useCompost}', cropsStart='${parameters.cropsStart}', cropsEnd = '${parameters.cropsEnd}', goalYield = '${parameters.goalYield}',
                    currentYield = '${parameters.currentYield}', cropsMemo = '${parameters.cropsMemo}',cropsFinish = 'false' ` +
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
        db.query(`SELECT * FROM userDcrop WHERE iscdCheck = 'true'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDCrop]"+
                    "\n \t" + `SELECT * FROM userDcrop WHERE iscdCheck = 'true'` +
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
  function select_notice(parameters) {
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
  function select_noticeDetail(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM notice WHERE nid = '${parameters.nid}'; `, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [notice]"+
                    "\n \t" + `SELECT * FROM notice WHERE nid = '${parameters.nid}';` +
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

  function insert_notice(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`INSERT INTO notice SET nTitle = '${parameters.nTitle}',nContent = '${parameters.nContent}',nWriter = '${parameters.nWriter}',nDate = NOW()`, function (error, db_data) {
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

  function select_totalGrowPercent(parameters){
    return new Promise(function(resolve, reject){
        db.query(`SELECT ROUND(((TIMESTAMPDIFF(day, cropsStart, NOW())) / (TIMESTAMPDIFF(day, cropsStart, cropsEnd))) * 100, 2) AS percent  FROM userCrop WHERE uid = '${parameters.userid}' and cropsName = '${parameters.cropsName}'`, function(error, db_data){
            if (error) {
                logger.error(
                    "DB error [totalGrowPercent]"+
                    "\n \t" + `SELECT ROUND(((TIMESTAMPDIFF(day, cropsStart, NOW())) / (TIMESTAMPDIFF(day, cropsStart, cropsEnd))) * 100, 2) AS percent  FROM userCrop WHERE uid = '${parameters.userid}' and cropsName = '${parameters.cropsName}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            else{
                resolve(db_data);
            }
        });
    });
  }

  function select_nearHarvestDate(parameters){
    return new Promise(function(resolve, reject){
        db.query(`SELECT cropsEnd FROM userCrop WHERE NOW() <= cropsEnd AND uid = "${parameters.userid}" and cropsName = "${parameters.cropsName}" ORDER BY cropsEnd ASC LIMIT 1`, function(error, db_data){
            if (error) {
                logger.error(
                    "DB error [nearHarvestDate]"+
                    "\n \t" + `SELECT cropsEnd FROM userCrop WHERE NOW() <= cropsEnd AND uid = "${parameters.userid}" and cropsName = "${parameters.cropsName}" ORDER BY cropsEnd ASC LIMIT 1` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            else{
                resolve(db_data);
            }
        })
    })
  }
  
  function select_totalYieldPercent(parameters){
      return new Promise(function(resolve, reject){
          db.query(`SELECT ROUND(AVG(((goalYield - currentYield) / goalYield) *100),2) AS avgYield FROM userCrop WHERE uid = "${parameters.userid}" AND cropsName = "${parameters.cropsName}"`, function(error, db_data){
            if (error) {
                logger.error(
                    "DB error [totalYieldPercent]"+
                    "\n \t" + `SELECT ROUND(AVG(((goalYield - currentYield) / goalYield) *100),2) AS avgYield FROM userCrop WHERE uid = "${parameters.userid}" AND cropsName = "${parameters.cropsName}"` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            else{
                resolve(db_data);
            }
          });
      });
  }

  function select_countDisease_totalCrops(parameters){
      return new Promise(function(resolve, reject){
          db.query(`SELECT ifnull(COUNT(*), '-') AS result FROM userCropDisease WHERE uid = "${parameters.userid}" and cropsName = "${parameters.cropsName}" AND CURDATE() = cdOccurDate GROUP BY cropsCultivar WITH rollup`, function(error, db_data){
            if (error) {
                logger.error(
                    "DB error [countDisease_totalCrops]"+
                    "\n \t" + `SELECT COUNT(*) AS result FROM userCropDisease WHERE uid = "${parameters.userid}" and cropsName = "${parameters.cropsName}" AND CURDATE() = cdOccurDate GROUP BY cropsCultivar WITH rollup` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            else{
                resolve(db_data);
            }
          });
      });
  }
  function select_dashMenuList(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT DISTINCT cropsName FROM userCrop WHERE uid = '${parameters.uid}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `SELECT cropsName FROM userCrop WHERE uid = '${parameters.uid}'` +
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

function select_userLatLon(parameterLocate) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT latitude, longitude FROM userCrop where locate = '${parameterLocate.locate}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `SELECT latitude, longitude FROM userCrop where locate = '${parameterLocate.locate}'` +
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

  function select_dashcropFinish() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT cropsName , cropsEnd FROM userCrop WHERE cropsFinish = 'true' ORDER BY cropsEnd DESC LIMIT 4;`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `SELECT cropsName , cropsEnd FROM userCrop WHERE cropsFinish = 'true' ORDER BY cropsEnd DESC LIMIT 4;'` +
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

function select_userLocate(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT locate FROM userCrop where uid = '${parameters.userid}' and cropsName = '${parameters.cropsName}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `SELECT locate FROM userCrop where uid = '${parameters.userid}' and cropsName= '${parameters.cropsName}'` +
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
  function select_dashcropDisease() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT cdName , cropsDate FROM userDcrop WHERE iscdCheck = 'true' ORDER BY cropsDate DESC LIMIT 7;`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDcrop]"+
                    "\n \t" + `SELECT cdName , cropsDate FROM userDCrop WHERE iscdCheck = 'true' ORDER BY cropsDate DESC LIMIT 7;` +
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
    
  function select_dashDonut(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT if(cropsName IS NULL, "total", cropsName) AS crops, COUNT(cropsName) AS count  FROM userCrop WHERE uid = '${parameters.uid}' GROUP BY cropsName WITH ROLLUP`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `SELECT if(cropsName IS NULL, "total", cropsName) AS crops, COUNT(cropsName) AS count  FROM userCrop WHERE uid = '${parameters.uid}' GROUP BY cropsName WITH ROLLUP` +
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
  select_notice,
  insert_notice,
  select_noticeDetail,
  select_totalGrowPercent,
  select_nearHarvestDate,
  select_totalYieldPercent,
  select_countDisease_totalCrops,
  select_dashMenuList,
  select_userLocate,
  select_userLatLon,
  select_dashcropFinish,
  select_dashcropDisease,
  select_dashDonut
}