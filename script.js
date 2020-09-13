$(document).ready(function () {

  let weather = ""
  let city = ""
  let current_date = moment().format("L");

  function clear() {
    $(".current").empty();
  }



  let search_history = JSON.parse(localStorage.getItem("cities")) === null ? [] : JSON.parse(localStorage.getItem("cities"));

  //console.log(search_history)

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
        //console.log(json)

        let temp = (json.main.temp - 273.15);
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
        $("#temperature").text(temp.toFixed(2) + "°C");
        $("#humidity").text(json.main.humidity + "%");
        $("#windspeed").text(windspeed.toFixed(2) + " " + "mph");
        uvRating = $("#uv-rating").text

      })
    }
 
    function uvRating()   {

      let lat = json.coord.lat
      let lon = json.coord.lon
      console.log(lat)
      console.log(lon)

      let uvURL = "http://api.openweathermap.org/data/2.5/uvi?" + APPID + "&lat=" + lat + "&lon=" + lon



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
$("#day-" + dayCount).children(".weather-temp").text("Temp: " + (response.list[i].main.temp - 273.15).toFixed(2) + "°C");
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



    


    $("#submit-city").click(displayHistory);
    
  })
    




   


   




