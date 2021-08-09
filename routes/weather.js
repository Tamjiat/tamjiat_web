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
function getWeatherAPI(){ //비동기 처리
    return new Promise(function (resolve, reject){
        request(defultURL +
            "?lat=" + 36.736301639335366 +
            "&lon=" + 127.0743693981298 +
            "&exclude=" + 'hourly' +
            "&units="+ 'metric' +
            "&appid=" + serviceKey ,function (err, res, body){

            console.log(body); // 응답받은 JSON 출력

            if(err){
                reject(new Error("Error"));
            }else{
                resolve(body);
            }
        })
    })
}

router.get('/api',(req, res, next) => {
    getWeatherAPI().then(function (data){
        console.log(data);

        let info = JSON.parse(data);

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

        for(i in info['daily']){
            var h_date = new Date(info['daily'][i]['dt'] * 1000);
            console.log("===================================");
            console.log('시간:  ' + h_date.getFullYear() + '-' + (h_date.getMonth() + 1) + '-' + h_date.getDate() + ' ' + h_date.getHours() + ":" + h_date.getMinutes() );
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
    }).catch(function (err){
        console.log(err);
    })
})

module.exports = router;