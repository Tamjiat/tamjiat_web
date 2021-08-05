'use strict';
var jwt = require('jsonwebtoken');

function jwtCreate(userData){
  return new Promise(function (resolve, reject) {
      jwt.sign({
        user_id: userData.user_id
      }, process.env.JWT_SECRET, {
        expiresIn: '7d',
        issuer: 'tamjiat',
      },function(err,token){
        if(err) reject(err)
        else resolve(token)
      });
  })
}

function jwtCerti(token){
  return new Promise(function (resolve, reject) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
          console.log("JWT was Expired!")
        }
        if(decoded){
          resolve(decoded);
        }
        else{
          resolve(false);
        }
      });
  })
}

module.exports = {
  jwtCreate,
  jwtCerti
};