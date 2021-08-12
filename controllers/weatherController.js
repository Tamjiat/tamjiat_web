var express = require('express');

function todayWeather(req, res, next) {
    getWeatherAPI().then(function (body) {
        console.log(body);

        let info = JSON.parse(body);

        console.log("===================================");
        console.log('현재 온도: ' + info['current']['temp'] + '℃');
        console.log('현재 기상조건(ID) :  ' + info['current']['weather'][0]['id']);
        console.log('현재 날씨(ID):    ' + info['current']['weather'][0]['main']);
        console.log('날씨 아이콘 아이디:    ' + info['current']['weather'][0]['icon']);
        console.log("===================================");
    }).catch(function (err){
        console.log(err);
    })
}

// /weather/getDayWeather
function getDayWeather(req, res, next) {
    var parameter = {
        queryDate : req.body.Date //12321321
    };

    getWeatherAPI(parameter).then(function (body) {
        console.log(body);

        let info = JSON.parse(body);

        for(i in info['daily']){
            if(parameter.queryDate == h_date){
                console.log("===================================");
                console.log('시간:  ' + h_date);
                console.log('온도: ' + info['daily'][i]['temp']['day'] + '℃');
                console.log('최저온도: ' + info['daily'][i]['temp']['min'] + '℃');
                console.log('최고온도: ' + info['daily'][i]['temp']['max'] + '℃');
                console.log('습도: ' + info['daily'][i]['humidity'] + '%');
                console.log('현재 자외선지수:  ' + info['daily'][i]['uvi']);
                console.log('현재 바람속도:   ' + info['daily'][i]['wind_speed'] + 'm/s');
                console.log('현재 강수량:    ' + info['daily'][i]['rain']);
                console.log('현재 기상조건(ID) :  ' + info['daily'][i]['weather'][0]['id']);
                console.log('현재 날씨(ID):    ' + info['daily'][i]['weather'][0]['main']);
                console.log('날씨 아이콘 아이디:    ' + info['daily'][i]['weather'][0]['icon']);
                console.log("===================================");
            }
        }
    }).catch(function (err){
        console.log(err);
    })
}

module.exports = {
    todayWeather,
    getDayWeather
}