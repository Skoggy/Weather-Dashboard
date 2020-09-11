

var apiKey = "8c321cc1716884b0a6eec6410a70fa25"
var q = "melbourne"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + q + "&APPID=" + apiKey


$(".submit").on("click", function(event) {
    event.preventDefault();
   
    

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
var currentTemp = $("<p>").text(celsTemp)
var humidity = $("<p>").text(coord.main.humidity)
var windSpeed = $("<p>").text(coord.wind.speed)
//var UvIndex = $("<p>").text(coord.wind.speed)

$(".current").append(cityName)
$(".current").append("Temperature: ", currentTemp)
$(".current").append("Humidity: ", humidity)
$(".current").append("Wind Speed: ", windSpeed)
}





