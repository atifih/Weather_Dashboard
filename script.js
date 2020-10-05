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
/*
// Current weather conditions: Generate weather, weather icon, humidity, wind.
var icon_id = response.weather[0].icon;
var icon_url = "http://openweathermap.org/img/w/" + icon_id + ".png";
$("#todayW").append("(" + today + ")");
$("#todayW").append(`<img src="${icon_url}">`);
$("#tempToday").append(response.main.temp.toFixed(2));
$("#humidityToday").append(response.main.humidity)
$("#windToday").append(response.wind.speed);
lat = response.coord.lat.toString();
long = response.coord.lon.toString();
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
*/
function displayCurrentConditions(queryURL, e) {
    e.preventDefault();
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log("Response is: ", response);
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
        $("#humidityToday").text("Humidity: " + humidity +"%");
        $("#windToday").text("Wind Speed: " + windSpeed + " KPH");
        // Store current city search in the city search history.
        if (cityHistory.length < 5) {
            cityHistory.push(response.name); // populate cityHistory array.
            // Save searched city in history.
        } else {

            // remove the last city search from history and append the current city search.
            cityHistory.splice(4, 1);
            cityHistory.push(response.name);
            
            
            
        
        
    
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
    
    
        }
    // Output the city history to user display.
                for(var i = 0; i < cityHistory.length; i++){
                    if (i === 0){
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


function displayFutureConditions(queryURL, e) {
    e.preventDefault();
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response3) {
        console.log("Response 3 is: ", response3);
        // $(".list-group").empty();
       // console.log("HERE", response3)
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
        // $("button3").on("click", function () {
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
        // })
    })
}
// setup Eventlisteners 
$(document).ready(function () {
    $("#run-search").on("click", function (e) {
        e.preventDefault();
        var cityWeather = $("#search-city")[0].value;
        
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&units=metric&appid=${APIkey}`
        let queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${APIkey}`
        let queryURLa = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&units=metric&appid=${APIkey}`

        displayCurrentConditions(queryURL, e);
        displayFutureConditions(queryURLa, e); 

        
        })
       
    })

        /*
                                var queryURLa = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather}&units=metric&appid=${APIkey}`
                                $.ajax({ url: queryURLa, method: "GET", }).then(function (response3) {
                                    console.log("Response 3 is", response3);
                                    $("#card1").text(day1.format("D/MM/YYYY"));
                                    
                                    var icon_id2 = response3.list[0].weather[0].icon;
                                    var icon_url2 = "http://openweathermap.org/img/w/" + icon_id2 + ".png";
                                    $("#card1").append(`<img src="${icon_url2}">`);
                                    // Set the weather and temperature for Day1.
                                    $("#humidity1").html(response3.list[0].main.humidity);
                                    $("#temp1").html(response3.list[0].main.temp);
                                    // Day 2: output the forecasted temperature and humidity & weeather forecast icon.
                                    $("#card2").text(day2.format("D/MM/YYYY"));
                                    var icon_id3 = response3.list[8].weather[0].icon;
                                    var icon_url3 = "http://openweathermap.org/img/w/" + icon_id3 + ".png";
                                    $("#card2").html(`<img src="${icon_url3}">`);
                                    $("#humidity2").html(response3.list[8].main.humidity);
                                    $("#temp2").html(response3.list[8].main.temp);
        
                                    // Day3 : output the forecasted temperature and humidity & weeather forecast icon.
                                    $("#card3").text(day3.format("D/MM/YYYY"));
                                    var icon_id4 = response3.list[16].weather[0].icon;
                                    var icon_url4 = "http://openweathermap.org/img/w/" + icon_id4 + ".png";
                                    $("#card3").html(`<img src="${icon_url4}">`);
                                    $("#humidity3").html(response3.list[16].main.humidity);
                                    $("#temp3").html(response3.list[16].main.temp);
        
                                    // Day4: output the forecasted temperature and humidity & weeather forecast icon.
                                    $("#card4").text(day4.format("D/MM/YYYY"));
                                    var icon_id5 = response3.list[24].weather[0].icon;
                                    var icon_url5 = "http://openweathermap.org/img/w/" + icon_id5 + ".png";
                                    $("#card4").html(`<img src="${icon_url5}">`);
                                    $("#humidity4").html(response3.list[24].main.humidity);
                                    $("#temp4").html(response3.list[24].main.temp);
        
                                    // Day5: output the forecasted temperature and humidity & weeather forecast icon.
                                    $("#card5").text(day5.format("D/MM/YYYY"));
                                    var icon_id6 = response3.list[32].weather[0].icon;
                                    var icon_url6 = "http://openweathermap.org/img/w/" + icon_id6 + ".png";
                                    $("#card5").append(`<img src="${icon_url6}">`);
                                    $("#humidity5").html(response3.list[32].main.humidity);
                                    $("#temp5").html(response3.list[32].main.temp);
        
                                    // Here we are building the URL we need to query the database for the current weather.
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
        
        
                                        if (cityHistory.length === 6) {
                                            // reset city history.
                                            cityHistory.splice(0, 5);
                                        }
        
                                        // Output the city history to user display.
                                        for (var i = 0; i < cityHistory.length; i++) {
                                            if (i === 0) {
                                                $("#button1").html(cityHistory[i]);
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
                                    */
        // Here we are building the URL we need to query the database for the current weather.