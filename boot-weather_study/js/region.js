// 1. 전체 URL 가져오기
const currentURL = location.href;
console.log(currentURL);

// 2. 쿼리스트링 파라메터 가져오기
const urlObj = new URL(currentURL);

//파라미터에 대한 정보가 들어있다.
const params = urlObj.searchParams;

// 파라메터의 값을 구한다. params.get("변수명");
const q = params.get("q");
const krcity = params.get("krcity");

console.log(q, krcity);

// 3. ajax 이용해 전체 날씨 정보 얻어오기
function getCityweather(q) {
  var temp = {};
  var urlAPI =
    "https://api.openweathermap.org/data/2.5/weather?appid=f3ea4e686e26d655625baab1f8541271&units=metric&lang=kr";
  urlAPI += "&q=" + q;

  $.ajax({
    type: "GET",
    url: urlAPI,
    dataType: "json",
    async: false, //동기상태 => ajax는 기본적으로 비동기다.
    success: function (data) {
      const celsius = data.main.temp.toFixed(0);
      $(".region-weather").text(`현재기온 : ${celsius}℃`);

      const description = data.weather[0].description;
      $(".description").text(`기상조건 : ${description}`);

      const feel_like = data.main.feels_like;
      $(".feel").text(`체감온도 : ${feel_like}℃`);

      const humidity = data.main.humidity;
      $(".humidity").text(`습도 : ${humidity} %`);

      const windspeed = data.wind.speed;
      $(".windspeed").text(`풍속 : ${windspeed}km/h `);

      const cloud = data.clouds.all;
      $(".cloud").text(`흐림 : ${cloud} `);

      const icon = data.weather[0].icon;
      temp.icon = icon;

      console.log(data);
    },
    error: function (request, status, error) {
      console.log("code:" + request.status);
      console.log("message:" + request.responseText);
      console.log("error:" + error);
    },
  });

  return temp;
}

// 4. 데이터 바인딩 작업
let temp = getCityweather(q);
console.log(temp);
$(".region-title").text(`${krcity} 상세날씨`);
var iconURL = "https://openweathermap.org/img/wn/" + temp.icon + ".png";
$(".region-icon").attr("src", iconURL);
