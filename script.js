var today = moment().format("D/MM/YYYY");

var day1 = moment().add(1, "days").calendar("DD MMM YYYY");
var day2 = moment().add(2, "days").calendar("DD MM YYYY")
var day3 = moment().add(3, "days").calendar("DD MMM YYYY");
var day4 = moment().add(4, "days").calendar("DD MMM YYYY");
var day5 = moment().add(5, "days").calendar("DD MMM YYYY");

$("#day1Button").text(day1 + "(tomorrow!)");
$("#day2Button").text(day2);
$("#day3Button").text(day3);
$("#day4Button").text(day4);
$("#day5Button").text(day5);

var lat;
var long;

$("#run-search").on("click", function (e) {

    e.preventDefault();
    var APIkey = "406718fbed1888cdf91f422159a0c803";
    //  var cityForecast = "Seattle";
    var cityForecast = $("#search-city")[0].value;
    console.log("City is" + cityForecast);
    // Here we are building the URL we need to query the database
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityForecast}&units=metric&appid=${APIkey}`
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        //  $("#weatherToday").append(JSON.stringify(response));
        // console.log(response);
        $("#todayW").append((response.name));

        var icon_id = response.weather[0].icon;
        var icon_url = "http://openweathermap.org/img/w/" + icon_id + ".png";
        $("#todayW").append("(" + today + ")");
        $("#todayW").append(`<img src="${icon_url}">`);
        $("#tempToday").append(response.main.temp);
        $("#humidityToday").append(response.main.humidity)
        $("#windToday").append(response.wind.speed);
        lat = "" + response.coord.lat;
        long = "" + response.coord.lon;


        console.log(lat);
        console.log(long);
        //  $("#weatherToday").append("UV Index: " + response.main.uv);


    })
    // Make a second ajax call for uv .
    var queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIkey}&lat=${lat}&lon=${long}`
    console.log(queryURL2);
    $.ajax({
        url: queryURL2,
        method: "GET",
    }).then(function (response2) {
        console.log("Response 2 is :" + response2);
    })

})