/*
    * openWeather api 구현 페이지
    * 자세한 반환 값 설명들은 openWeathjer.md파일 확인
    *
    * @author 김민수
    * @version 1.0.0
    * @see 김득회, 이규환
    * 작성일 2021-08-09
*/

const express = require('express');
const router = express.Router();
const request = require("request");

var defultURL = "https://api.openweathermap.org/data/2.5/onecall"; //Default API 주소
var serviceKey = '74518c7e58bf7780b75ad0b30206ea2e'; //API Key

/*
    * @brief : openWeather API를 이용하여 날씨 정보 불러오는 부분, 함수로 바꿔서 사용하면 될듯
    * @date: 2021-08-09
    * @factor lat/lon : 위도/경도
    * @factor exclude : daily를 넣으면 hourly 값이 나옴 / hourly를 넣으면 daily 값이 나옴
    * @factor units : 단위 변환 (섭씨, 화씨 등) => ( standard, metric, imperial)
    * @factor appid : API Key
*/

request(defultURL +
    "?lat=" + 36.736301639335366 +
    "&lon=" + 127.0743693981298 +
    "&exclude=" + 'daily' +
    "&units="+ 'metric' +
    "&appid=" + serviceKey ,function (err, res, body){

    console.log(body); // 응답받은 JSON 출력

    if(err){
        throw new Error(err);
    }
    let info = JSON.parse(body);
    //Date()는 밀리세컨드 기준이므로 1000을 곱해야 한다. 이하 동일
    var date = new Date(info['current']['dt'] * 1000);
    var sunrise = new Date(info['current']['sunrise'] * 1000);
    var sunset = new Date(info['current']['sunset'] * 1000);

    console.log("===================================");
    console.log('일출시간:  ' + sunrise.getFullYear() + '-' + (sunrise.getMonth() + 1) + '-' + sunrise.getDate() + ' ' + sunrise.getHours() + ":" + sunrise.getMinutes() );
    console.log('일몰시간:  ' + sunset.getFullYear() + '-' + (sunset.getMonth() + 1) + '-' + sunset.getDate() + ' ' + sunset.getHours() + ":" + sunset.getMinutes() );
    console.log('현재시간:  ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() );
    console.log('위도/경도: ' + info['lat'] + '/' + info['lon']);
    console.log('현재 온도: ' + info['current']['temp'] + '℃');
    console.log('현재 습도: ' + info['current']['humidity'] + '%');
    console.log('현재 자외선지수:  ' + info['current']['uvi']);
    console.log('현재 바람속도:   ' + info['current']['wind_speed'] + 'm/s');
    console.log('현재 강수량:    ' + info['current']['rain']);
    console.log('현재 기상조건(ID) :  ' + info['current']['weather'][0]['id']);
    console.log('현재 날씨(ID):    ' + info['current']['weather'][0]['main']);
    console.log('날씨 아이콘 아이디:    ' + info['current']['weather'][0]['icon']);
    console.log("===================================");

    for(i in info['hourly']){
        var h_date = new Date(info['hourly'][i]['dt'] * 1000);
        console.log("===================================");
        console.log('시간:  ' + h_date.getFullYear() + '-' + (h_date.getMonth() + 1) + '-' + h_date.getDate() + ' ' + h_date.getHours() + ":" + h_date.getMinutes() );
        console.log('온도: ' + info['hourly'][i]['temp'] + '℃');
        console.log('습도: ' + info['hourly'][i]['humidity'] + '%');
        console.log('현재 자외선지수:  ' + info['hourly'][i]['uvi']);
        console.log('현재 바람속도:   ' + info['hourly'][i]['wind_speed'] + 'm/s');
        console.log('현재 강수량:    ' + info['hourly'][i]['rain']);
        console.log('현재 기상조건(ID) :  ' + info['hourly'][i]['weather'][0]['id']);
        console.log('현재 날씨(ID):    ' + info['hourly'][i]['weather'][0]['main']);
        console.log('날씨 아이콘 아이디:    ' + info['hourly'][i]['weather'][0]['icon']);
        console.log("===================================");
    }

})

module.exports = router;