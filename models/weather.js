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

function getWeatherAPI(parameter){ //비동기 처리
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


module.exports = {
    getWeatherAPI
}