var today = moment().format("D/MM/YYYY");
var day1 = moment().add(1, "days");
var day2 = moment().add(2, "days");
var day3 = moment().add(3, "days");
var day4 = moment().add(4, "days");
var day5 = moment().add(5, "days");
var lat;
var long;
var cityHistory = [];
var cityWeather = "";
var APIkey = "406718fbed1888cdf91f422159a0c803";

init();


function init() {
    var storedCity = localStorage.getItem("cityHistory");
    if (storedCity !== null) {
        cityWeather = storedCity;
    }

    // Setup the query urls for ajax calls.
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&units=metric&appid=${APIkey}`
    let queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${APIkey}`
    let queryURLa = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&units=metric&appid=${APIkey}`

    // Render the last city search weather details.
    displayCurrentConditions(queryURL);
    displayFutureConditions(queryURLa);

}



function displayCurrentConditions(queryURL) {


    var lastWeatherCity = localStorage.getItem("cityHistory");
    console.log(lastWeatherCity);
    // set last city searched.
    if (lastWeatherCity !== null) {
        // Retrieve from  local storage.

        cityHistory.push(lastWeatherCity);
        cityWeather = lastWeatherCity;
        console.log(cityWeather);

    } else if (lastWeatherCity === null) {
        // Pre: weatherCity is null  - Local storage is empty.
        cityWeather = cityHistory[cityHistory.length];
    }
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        $("#todayW").empty();
        $("#todayW").append((response.name));
        var icon_id = response.weather[0].icon;
        var icon_url = "http://openweathermap.org/img/w/" + icon_id + ".png";
        $("#todayW").append("(" + today + ")");
        $("#todayW").append(`<img src="${icon_url}">`);
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        $("#tempToday").text("Temperature:" + temp + " ℃");
        $("#humidityToday").text("Humidity: " + humidity + "%");
        $("#windToday").text("Wind Speed: " + windSpeed + " KPH");
        // Store current city search in the city search history local storage.

        if (cityHistory.length < 5) {
            // Save searched city in history.
            cityHistory.push(response.name); // populate cityHistory array.
            localStorage.setItem("cityHistory", response.name)

        } else {
            // remove the last city search from history and append the current city search.
            cityHistory.splice(1, 1, response.name);

            localStorage.setItem("cityHistory", response.name);
        }

        // Get co-ordinates for the 2nd ajax call.
        lat = response.coord.lat.toString();
        long = response.coord.lon.toString();
        let queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${APIkey}`
        // Make another ajax call to retrieve the current U.V. Index
        $.ajax({
            url: queryURL2,
            method: "GET",
        }).then(function (response2) {
            // console.log("Response 2 is", response2);
            uvIndex = response2.value;
            $("#uvToday").html(uvIndex);
            if (uvIndex > 2 && uvIndex < 5) {
                $("#uvToday").attr("id", "favourable");
                //set my class or id to have a certain css style color
            } else if (uvIndex >= 5 && uvIndex < 7) {
                //set my class or id to have a different css style color
                $("#uvToday").attr("id", "moderate");
            } else {
                //set my css color to a style color
                $("#uvToday").attr("id", "severe");
            }
        })


        // Output the city history to user display.
        for (var i = 0; i < cityHistory.length; i++) {
            if (i === 0) {
                $("#button1").html(cityHistory[i]);
                console.log("city history: ", cityHistory[i]);
            } else if (i === 1) {
                $("#button2").html(cityHistory[i]);
            } else if (i === 2) {
                $("#button3").html(cityHistory[i]);
            } else if (i === 3) {
                $("#button4").html(cityHistory[i]);
            } else if (i === 4) {
                $("#button5").html(cityHistory[i]);
            }
        }
    })
}



function displayFutureConditions(queryURL) {

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response3) {
        console.log("Response 3 is: ", response3);

        // Day 1 
        $("#card-title").text("5-Day Forecast");
        //  var Day1 = day1.format("D/MM/YYYY");
        var Day1 = day1.format("D/MM/YYYY")
        $("#date1").text(Day1);
        // weather icon.
        var icon_id2 = response3.list[0].weather[0].icon;
        var icon_url2 = "http://openweathermap.org/img/w/" + icon_id2 + ".png";
        var humidity = response3.list[0].main.humidity;
        var temp = response3.list[0].main.temp;

        $("#icon1").html(`<img src="${icon_url2}">`);
        $("#temp1").text("Temp: " + temp + " ℃");
        $("#humidity1").text("Humidity: " + humidity + "%");


        // Day 2
        var icon_id3 = response3.list[8].weather[0].icon;
        var icon_url3 = "http://openweathermap.org/img/w/" + icon_id3 + ".png";
        var humidity2 = response3.list[8].main.humidity;
        var temp2 = response3.list[0].main.temp;
        var Day2 = day2.format("D/MM/YYYY");
        $("#date2").text(Day2);
        $("#icon2").html(`<img src="${icon_url3}">`);
        $("#temp2").text("Temp: " + temp2 + " ℃");
        $("#humidity2").text("Humidity: " + humidity2 + "%");

        // Day 3.

        var icon_id4 = response3.list[16].weather[0].icon;
        var icon_url4 = "http://openweathermap.org/img/w/" + icon_id4 + ".png";
        var humidity3 = response3.list[16].main.humidity;
        var temp3 = response3.list[16].main.temp;
        $("#date3").text(day3.format("D/MM/YYYY"));
        $("#icon3").html(`<img src="${icon_url4}">`);
        $("#temp3").text("Temp: " + temp3 + " ℃");
        $("#humidity3").text("Humidity: " + humidity3 + "%");

        // Day 4.
        var icon_id5 = response3.list[24].weather[0].icon;
        var icon_url5 = "http://openweathermap.org/img/w/" + icon_id5 + ".png";
        var humidity4 = response3.list[24].main.humidity;
        var temp4 = response3.list[24].main.temp;
        $("#date4").text(day4.format("D/MM/YYYY"));
        $("#icon4").html(`<img src="${icon_url5}">`);
        $("#temp4").text("Temp: " + temp4 + " ℃");
        $("#humidity4").text("Humidity: " + humidity4 + "%");

        // Day 5.
        var icon_id6 = response3.list[32].weather[0].icon;
        var icon_url6 = "http://openweathermap.org/img/w/" + icon_id6 + ".png";
        var humidity5 = response3.list[32].main.humidity;
        var temp5 = response3.list[32].main.temp;
        $("#date5").text(day5.format("D/MM/YYYY"));
        $("#icon5").html(`<img src="${icon_url6}">`);
        $("#temp5").text("Temp: " + temp5 + " ℃");
        $("#humidity5").text("Humidity: " + humidity5 + "%");

    })
}
// setup Eventlisteners 
$(document).ready(function () {

    $("#run-search").on("click", function (e) {
        e.preventDefault();
        cityWeather = $("#search-city")[0].value;

        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&units=metric&appid=${APIkey}`
        let queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${APIkey}`
        let queryURLa = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&units=metric&appid=${APIkey}`

        displayCurrentConditions(queryURL);
        displayFutureConditions(queryURLa);


    })

})

// Search History search event listener.
$(document).ready(function () {

    $("#button1").on("click", function (e) {
        e.preventDefault();
        cityWeather = cityHistory[0];

        // Setup the query urls for ajax calls.
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&units=metric&appid=${APIkey}`
        let queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${APIkey}`
        let queryURLa = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&units=metric&appid=${APIkey}`

        displayCurrentConditions(queryURL);
        displayFutureConditions(queryURLa);
    })

    $("#button2").on("click", function (e) {
        e.preventDefault();
        cityWeather = cityHistory[1];
        // Setup the query urls for ajax calls.
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&units=metric&appid=${APIkey}`
        let queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${APIkey}`
        let queryURLa = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&units=metric&appid=${APIkey}`

        displayCurrentConditions(queryURL);
        displayFutureConditions(queryURLa);
    })

    $("#button3").on("click", function (e) {
        e.preventDefault();
        cityWeather = cityHistory[2];
        // Setup the query urls for ajax calls.
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&units=metric&appid=${APIkey}`
        let queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${APIkey}`
        let queryURLa = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&units=metric&appid=${APIkey}`

        displayCurrentConditions(queryURL);
        displayFutureConditions(queryURLa);

    })
    $("#button4").on("click", function (e) {
        e.preventDefault();
        cityWeather = cityHistory[3];
        // Setup the query urls for ajax calls.
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&units=metric&appid=${APIkey}`
        let queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${APIkey}`
        let queryURLa = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&units=metric&appid=${APIkey}`

        displayCurrentConditions(queryURL);
        displayFutureConditions(queryURLa);

    })
    $("#button4").on("click", function (e) {
        e.preventDefault();
        cityWeather = cityHistory[4];
        // Setup the query urls for ajax calls.
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&units=metric&appid=${APIkey}`
        let queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${APIkey}`
        let queryURLa = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&units=metric&appid=${APIkey}`

        displayCurrentConditions(queryURL);
        displayFutureConditions(queryURLa);

    })
    $("#button5").on("click", function (e) {
        e.preventDefault();
        cityWeather = cityHistory[4];
        // Setup the query urls for ajax calls.
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&units=metric&appid=${APIkey}`
        let queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${APIkey}`
        let queryURLa = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&units=metric&appid=${APIkey}`

        displayCurrentConditions(queryURL);
        displayFutureConditions(queryURLa);
    })
})







