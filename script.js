var today = moment().format("D/MM/YYYY");

var day1 = moment().add(1, "days");
var day2 = moment().add(2, "days");
var day3 = moment().add(3, "days");
var day4 = moment().add(4, "days");
var day5 = moment().add(5, "days");



var lat;
var long;

var cityHistory = [];
var APIkey = "406718fbed1888cdf91f422159a0c803";

$("#run-search").on("click", function (e) {

    e.preventDefault();
    // var APIkey = "406718fbed1888cdf91f422159a0c803";
    //  var cityForecast = "Seattle";
    // var cityForecast = $("#search-city")[0].value;
    var cityWeather = $("#search-city")[0].value;

    var queryURLa = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&units=metric&appid=${APIkey}`
    $.ajax({ url: queryURLa, method: "GET", }).then(function (response3) {
        console.log("Response 3 is", response3);    // Generate weather icon.    var icon_id = response3.weather[0].icon;    var icon_url = "http://openweathermap.org/img/w/" + icon_id + ".png";       })
        $("#card1").text(day1.format("D/MM/YYYY"));
        // Generate weather icon

        var icon_id2 = response3.list[0].weather[0].icon;
        var icon_url2 = "http://openweathermap.org/img/w/" + icon_id2 + ".png";
        $("#card1").append(`<img src="${icon_url2}">`);

        // Here we are building the URL we need to query the database

        console.log(cityWeather);
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&units=metric&appid=${APIkey}`
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            //  $("#weatherToday").append(JSON.stringify(response));
            console.log(response);
            $("#todayW").empty();
            $("#todayW").append((response.name));

            cityHistory.push(response.name); // populate cityHistory array.
            // Save searched city in history.

            if (cityHistory.length === 5) {
                // reset city history.
                cityHistory.splice(0, 5);
            }

            // Output the city history to user display.
            for (var i = 0; i < cityHistory.length; i++) {
                if (i === 0) {
                    $("#button1").append(cityHistory[i]);
                } else if (i === 1) {
                    $("#button2").append(cityHistory[i]);
                } else if (i === 2) {
                    $("#button3").append(cityHistory[i]);
                } else if (i === 3) {
                    $("#button4").append(cityHistory[i]);
                } else if (i === 4) {
                    $("#button5").append(cityHistory[i]);
                }
            }


            // Generate weather icon.
            var icon_id = response.weather[0].icon;
            var icon_url = "http://openweathermap.org/img/w/" + icon_id + ".png";

            $("#todayW").append("(" + today + ")");
            $("#todayW").append(`<img src="${icon_url}">`);
            $("#tempToday").append(response.main.temp.toFixed(2));
            $("#humidityToday").append(response.main.humidity)
            $("#windToday").append(response.wind.speed);

            lat = response.coord.lat.toString();
            long = response.coord.lon.toString();


            console.log(lat);
            console.log(long);
            //  $("#weatherToday").append("UV Index: " + response.main.uv);


        }).then(function (response2) {
            var queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${APIkey}`
            // Make another ajax call to retrieve the current U.V. Index
            $.ajax({
                url: queryURL2,
                method: "GET",
            }).then(function (response2) {
                // console.log("Response 2 is", response2);
                uvIndex = response2.value;
                $("#uvToday").append(uvIndex);
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
        })

    })
})

// Make another ajax call to retrieve the current U.V. Index
$("#card2").text(day2.format("D/MM/YYYY"));
$("#card3").text(day3.format("D/MM/YYYY"));
$("#card4").text(day4.format("D/MM/YYYY"));
$("#card5").text(day5.format("D/MM/YYYY"));

