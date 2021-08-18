'use strict';
var db = require("../config/db");
var logger = require('../config/logger');

function select_userCropLocate() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT COUNT(locate) as locate FROM userCrop`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [usercrop]"+
                    "\n \t" + `SELECT COUNT(locate) as locate FROM userCrop` +
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

function select_userparamterCropLocate(parameters) {
  return new Promise(function (resolve, reject) {
      db.query(`SELECT COUNT(locate) as locate FROM userCrop WHERE locate='${parameters.locate}'`, function (error, db_data) {
          if (error) {
              logger.error(
                  "DB error [usercrop]"+
                  "\n \t" + `SELECT COUNT(locate) as locate FROM userCrop` +
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
    select_userCropLocate,
    select_userparamterCropLocate
}