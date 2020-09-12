




  function clear() {
    $(".current").empty();
  }
  


//var cityName = $(".city-input").val().trim();

//var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey


$(".submit").on("click", function() {

  clear();
  
  var queryParams = { "APPID": "8c321cc1716884b0a6eec6410a70fa25" }

  queryParams.q = $(".city-input").val().trim();

  var queryURL = "http://api.openweathermap.org/data/2.5/weather?"

  queryURL = queryURL + $.param(queryParams);
  console.log(queryURL + $.param(queryParams))

  //var apiKey = "8c321cc1716884b0a6eec6410a70fa25"
  //cityName = $(".city-input").val().trim()
  //var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey
    
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    currentWeather(response)
    console.log(response)


  })  
})  
var currentWeather = function(coord) {
  console.log(coord.main.feels_like)
  console.log
var cityName = $("<h2>").text(coord.name);
var celsTemp =(coord.main.feels_like) - 273.15
var celsTemp = celsTemp.toFixed(2);
var currentTemp = $("<p>").text(celsTemp)
var humidity = $("<p>").text(coord.main.humidity)
var windSpeed = $("<p>").text(coord.wind.speed)
//var UvIndex = $("<p>").text(coord.wind.speed)

$(".current").append(cityName)
$(".current").append("Temperature: ", currentTemp)
$(".current").append("Humidity: ", humidity)
$(".current").append("Wind Speed: ", windSpeed)
}





