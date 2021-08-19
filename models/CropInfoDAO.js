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
module.exports = {
    select_cropCategoryCount
}