$(document).ready(function () {
    let i = 0;
    let cityArr = [];
    const apiKey = "ea3467aafccdf773b0cc5ec23211ed95";


    // Use the [OpenWeather API](https://openweathermap.org/api)
    //- http://api.openweathermap.org/data/2.5/weather
    //- http://api.openweathermap.org/data/2.5/forecast
    //- http://api.openweathermap.org/data/2.5/uvi


    let forecastURL = "http://api.openweathermap.org/data/2.5/forecast?appid=" + apiKey + "&q=";




    $("#seachBtn").on("click", function () {
        let city = $("#city").val()
        let weatherURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + city;
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            var currentDate = moment(response.dt, "X").format("MM/DD/YYYY")
            var row = $("<div class='row'>")
            var col = $("<div class='col-sm-12'>")
            var img = $("<img>")
            img.attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            var h3 = $("<h3>")
            h3.append(response.name, " (" + currentDate + ")", img)

            var p = $("<p>")
            temp = ((response.main.temp - 273.15) * 1.8) + 32
            temp = Math.round(temp)
            p.append("temperature: " + temp + " F" + "<br><br>")
            var humidity = response.main.humidity
            p.append("humidity: " + humidity)
            col.append(h3, p)
            row.html(col)
            $("#dashboard").append(row)

            var lat = response.coord.lat
            var lon = response.coord.lon
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon,
                method: "GET"
            }).then(function (response2) {
                console.log("response2:")
                console.log(response2)

                $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&q=",
                    method: "GET"
                }).then(function(response3){
                    console.log("response3:")
                    console.log(response3)
                })
            })


        })

    })

































})