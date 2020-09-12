$(document).ready(function(){
  //var cityListString = localStorage.getItem("cityList");

  //var cityList = JSON.parse(cityListString);

  //if (cityList == null) {
    //cityList = {};
  //}
  
  //cityListCreate(cityList)

  //$(".current").hide()
//})

//function cityListCreate()  {
  //$(".city-list").empty();
  //var cityLi = $("<li>")

  
  //for (var i = 0; i < cityList.length; i++) {
    //var cityEntry = $("<button>");
    //cityEntry = $("<li>");

    //var cityInp = $(".city-input").val()
    //cityEntry.text(cityInp).

    //$(".city-list").append(cityEntry);
  //}


//}

  function clear() {
    $(".current").empty();
  }
  



let search_history = JSON.parse(localStorage.getItem("cities")) === null ? [] : JSON.parse(localStorage.getItem("cities"));

console.log(search_history)

displayHistory();




//var cityName = $(".city-input").val().trim();

//var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey


$(".submit").on("click", function() {

  clear();


  if ($(this).attr("id") === "submit")  {
    city = $(".city-input").val();
  } else {
    city = $(this).text();
  }
  
  console.log(city);

  if (search_history.indexOf(city) === -1) {
    search_history.push(city);
  }

  console.log(search_history);
  localStorage.setItem("cities", JSON.stringify(search_history));


  
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


function displayHistory() {
  $(".city-list").empty();
  search_history.forEach(function (city) {
  let historyItem = $("<li>")

  historyItem.text(city);

  $(".city-list").prepend(historyItem);
  })
}


//$(".submit").on("click", function(event) {

 //var city = $(".city-input").val().trim();
//if (city != "")  {
  //cityList[city] = true;
  //localStorage.setItem("cityList", JSON.stringify(cityList));

  //$(".current").show()
  
//}

})


