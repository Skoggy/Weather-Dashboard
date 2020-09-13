$(document).ready(function () {

  let weather = ""
  let city = ""
  let current_date = moment().format("L");

  function clear() {
    $(".current").empty();
  }



  let search_history = JSON.parse(localStorage.getItem("cities")) === null ? [] : JSON.parse(localStorage.getItem("cities"));

  console.log(search_history)

  displayHistory();

    function currentWeather() {

      if ($(this).attr("id") === "submit") {
        city = $(".city-input").val();
      } else {
        city = $(this).text();
      }


      if (search_history.indexOf(city) === -1) {
        search_history.push(city);
      }


      localStorage.setItem("cities", JSON.stringify(search_history));

      //forecastURL = forecastURL + $.param(queryParams);


      APPID = "8c321cc1716884b0a6eec6410a70fa25"
      city = $(".city-input").val().trim();
      weather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APPID;

      $.getJSON(weather, function (json) {
        console.log(json)

        let temp = (json.main.temp - 273.15) * (9 / 5) + 32;
        let windspeed = json.wind.speed * 2.237;
        //var cityName = $("<h2>").text(coord.name);
        //var celsTemp = (coord.main.feels_like) - 273.15
        //var celsTemp = celsTemp.toFixed(2);
        //var currentTemp = $("<p>").text(celsTemp)
        //var humidity = $("<p>").text(coord.main.humidity)
        //var windSpeed = $("<p>").text(coord.wind.speed)
        //$("#weather-img").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
        //var UvIndex = $("<p>").text(coord.wind.speed)

        //$(".current").append(cityName)
        //$(".current").append("Temperature: ", currentTemp)
        //$(".current").append("Humidity: ", humidity)
        //$(".current").append("Wind Speed: ", windSpeed)
        $("#current-city").text(json.name + " " + current_date);
        $("#weather-img").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
        $("#temperature").text(temp.toFixed(2) + "°F");
        $("#humidity").text(json.main.humidity + "%");
        $("#windspeed").text(windspeed.toFixed(2) + " " + "mph");
        $()

      })
    }

function fiveDayForecast() {
  let fiveDayForeCast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + APPID;


  let dayCount = 1;
$.ajax({
      url: fiveDayForeCast,
      method: "GET"
     }).then(function(response) {
       console.log(response)  

        for (let i = 0; i < response.list.length; i++){
          
          let date_and_time = response.list[i].dt_txt;
          console.log(date_and_time)
          let date = date_and_time.split(" ")[0];
          let time = date_and_time.split(" ")[1];


          if (time === "15:00:00")  {
            let year = date.split("-")[0]
            let month = date.split("-")[1]
            let day = date.split("-")[2]
$("#day-" + dayCount).children(".card-date").text(month + "/" + day + "/" + year)
$("#day-" + dayCount).children(".weather-icon").attr("src", "https://api.openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
$("#day-" + dayCount).children(".weather-temp").text("Temp: " + ((response.list[i].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "°F");
$("#day-" + dayCount).children(".weather-humidity").text("Humidity: " + response.list[i].main.humidity + "%");
dayCount++;

          }
        }

       })

     }
    


    function displayHistory() {
      //$(".city-list").empty();
      search_history.forEach(function (city) {
        let historyItem = $("<li>")

        historyItem.addClass("list-group-item btn btn-light")


        historyItem.text(city);

        $(".city-list").prepend(historyItem);
        
      })
      
    }

    $(".btn").click(currentWeather);
    $(".btn").click(fiveDayForecast)



    //function formatDates(data) {
    //var dateArray = data.split("-");
    //var formattedDate = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
    //return formattedDate
    //}


    $("#submit-city").click(displayHistory);
    //$(".city-list").on("click", function (event) {
    // $("li").val($(event.target).text());
    // historyWeather();
    //});
  })
    ////function historyWeather(){ 


    //$.ajax({
    //  url: queryURL,
    //   method: "GET"
    // }).then(function(response) {
    //   console.log(response)


    // })  
    //} 




    //console.log(search_history)
    //for (var i = 0; i < search_history.length; i++) {
    // $(".city-list").on('click', function()  {
    //console.log(search_history)
    //var queryParams = { "APPID": "8c321cc1716884b0a6eec6410a70fa25" }
    // console.log(city)
    //queryParams.q = historyItem


    //  var queryURL = "http://api.openweathermap.org/data/2.5/weather?"

    // queryURL = queryURL + $.param(queryParams);
    // $.ajax({
    ///   url: queryURL,
    //   method: "GET"
    // }).then(function(response) {
    //  currentWeather(response)
    //  console.log(response)


    /// })


    //})





    //$(".submit").on("click", function(event) {

    //var city = $(".city-input").val().trim();
    //if (city != "")  {
    //cityList[city] = true;
    //localStorage.setItem("cityList", JSON.stringify(cityList));

    //$(".current").show()

    //}
    //var queryURL = "http://api.openweathermap.org/data/2.5/weather?"
    //var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?"
    //queryURL = queryURL + $.param(queryParams);


    //$.ajax({
    //url: queryURL,
    //method: "GET"
    //}).then(function (response) {
    //currentWeather(response)
    //console.log(response)


    //})})

    //var apiKey = "8c321cc1716884b0a6eec6410a70fa25"
    //cityName = $(".city-input").val().trim()
    //var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey

    //forecastURL = forecastURL + $.param(queryParams);
    //var fiveDayForecastArray = [];
    //$.ajax({
    //url: forecastURL,
    //method: "GET"
    //}).then(function (response) {
    //forecastWeather(response)
    //console.log(response)


    // var tempForecastObj;

    //for (var i = 4; i < response.list.length; i += 8) {
    //tempForecastObj = {
    //date: response.list[i].dt_text.split(" ")[0],
    //weatherIcon: response.list[i].weather[0].icon,
    //temperature: response.list[i].main.temp.toFixed(2),
    //humidity: response.list[i].main.humidity
    //};
    //fiveDayForecastArray.push(tempForecastObj);
    // }

    //for (var i = 0; i < fiveDayForecastArray.length; i++) {
    // fiveDayForecastArray[i].date = formatDates(fiveDayForecastArray[i].date);
    // }

    //var forecastHeader = $("<h5>5-Day Forecast:</h5>");
    //$("#forecast-header").append(forecastHeader);

    //for (var i = 0; i < fiveDayForecastArray.length; i++) {
    //var forecast = $('<div class="row"><span class="span"><h5>' + fiveDayForecastArray[i].date + '</h5>' +
    //'<p><img class="w-100" src="http://openweathermap.org/img/wn/' + fiveDayForecastArray[i].weatherIcon + '@2x.png"></p>' +
    //'<p>Temp: ' + fiveDayForecastArray[i].temperature + '</p>' +
    //'<p>Humidity: ' + fiveDayForecastArray[i].humidity + '%</p>' +
    //'<span></div>');
    //$(".forecast-row").append(forecast)

    //}


    //})}




