$(document).ready(function () {
  const fiveDayContainer = document.getElementById('day-container')

  let weather = ""
  let city = ""
  let current_date = moment().format("L");

  let search_history = JSON.parse(localStorage.getItem("cities")) === null ? [] : JSON.parse(localStorage.getItem("cities"));

  displayHistory();

  function showFiveDay() {
    fiveDayContainer.classList.remove('hide')
  }
  function currentWeather() {

    if ($(this).attr("id") === "submit-city") {
      city = $(".city-input").val();
    } else {
      city = $(this).text();
    }
    APPID = "8c321cc1716884b0a6eec6410a70fa25"
    weather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APPID;

    console.log(search_history.indexOf(city))
    console.log(this)
    console.log(city)
    if (search_history.indexOf(city) === -1) {
      search_history.push(city);
    }


    localStorage.setItem("cities", JSON.stringify(search_history));

    APPID = "8c321cc1716884b0a6eec6410a70fa25"

    weather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APPID;

    $.getJSON(weather, function (json) {

      let temp = (json.main.temp - 273.15);
      let windspeed = json.wind.speed * 3.6;

      $("#current-city").text(json.name + " " + current_date);
      $("#weather-img").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
      $("#temperature").text(temp.toFixed(2) + "°C");
      $("#humidity").text(json.main.humidity + "%");
      $("#windspeed").text(windspeed.toFixed(2) + " " + "kph");
      console.log(json)
      let lat = json.coord.lat
      let lon = json.coord.lon


      let uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APPID + "&lat=" + lat + "&lon=" + lon


      $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function (response) {
        console.log(response)


        $("#uv-index").text(response.value);
        if (response.value < 3) {
          $("#uv-index").attr("class", "badge-success")
        } else if (response.value > 3 && response.value < 7) {
          $("#uv-index").attr("class", "badge-warning")
        } else if (response.value > 7) {
          $("#uv-index").attr("class", "badge-danger")
        }
      })
    })
  }

  function fiveDayForecast() {
    let fiveDayForeCast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + APPID;


    let dayCount = 1;
    $.ajax({
      url: fiveDayForeCast,
      method: "GET"
    }).then(function (response) {


      for (let i = 0; i < response.list.length; i++) {

        let date_and_time = response.list[i].dt_txt;
        let date = date_and_time.split(" ")[0];
        let time = date_and_time.split(" ")[1];


        if (time === "15:00:00") {
          let year = date.split("-")[0]
          let month = date.split("-")[1]
          let day = date.split("-")[2]
          $("#day-" + dayCount).children(".card-date").text(month + "/" + day + "/" + year)
          $("#day-" + dayCount).children(".weather-icon").attr("src", "https://api.openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
          $("#day-" + dayCount).children(".weather-temp").text("Temp: " + (response.list[i].main.temp - 273.15).toFixed(2) + "°C");
          $("#day-" + dayCount).children(".weather-humidity").text("Humidity: " + response.list[i].main.humidity + "%");
          showFiveDay();
          dayCount++;
        }
      }
    })
  }

  function displayHistory() {
    $(".city-list").empty();
    search_history.forEach(function (city) {
      console.log(search_history);
      let historyItem = $("<li>")

      historyItem.addClass("list-group-item btn btn-light")
      historyItem.text(city);

      $(".city-list").prepend(historyItem);

    });

    $(".btn").on("click", currentWeather);
    $(".btn").on("click", fiveDayForecast);
  }


  function historyClear() {
    $(".city-list").empty();
    search_history = [];
    localStorage.setItem("cities", JSON.stringify(search_history));
  }

  $("#submit-city").click(displayHistory);
  $("#history-clear").click(historyClear);
})













