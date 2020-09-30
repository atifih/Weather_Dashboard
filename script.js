var today = moment().format("Do MMM YYYY");

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



$("#submitButton").on("click", function (e) {

    var APIkey = "406718fbed1888cdf91f422159a0c803";
    var dayForecast = $("search-city").val();
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=${dayForecast}&appid=${APIkey}"
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        $("#weatherToday").text(JSON.stringify(response));
        console.log(JSON.stringify(response));
    })
})
