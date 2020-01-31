$(document).ready(function () {
    let index = 0;
    let cityArr = [];
    const apiKey = "ea3467aafccdf773b0cc5ec23211ed95";
    const convertTemp = temperature => {
        return Math.round(((temperature - 273.15) * 1.8) + 32)
    }

if (localStorage.getItem('searchCity')) {
cityArr=JSON.parse(localStorage.getItem('searchCity'))
}
console.log(cityArr)


    // Use the [OpenWeather API](https://openweathermap.org/api)
    //- http://api.openweathermap.org/data/2.5/weather
    //- http://api.openweathermap.org/data/2.5/forecast
    //- http://api.openweathermap.org/data/2.5/uvi





    // let forecastURL = "http://api.openweathermap.org/data/2.5/forecast?appid=" + apiKey + "&q=";


    $("#seachBtn").on("click", function () {
        let city = $("#city").val();
        cityArr.push(city)
        localStorage.setItem('searchCity',JSON.stringify(cityArr))





       
        let weatherURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + city + "&units=imperial";
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
           

            var currentDate = moment(response.dt, "X").format("MM/DD/YYYY")
            var row = $("<div class='row'>")
            var col = $("<div class='col-sm-12'>")
            var img = $("<img>")
            img.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            var h3 = $("<h3>")
            h3.append(response.name, " (" + currentDate + ")", img)
            var p = $("<p>")
            var temp = response.main.temp
            p.append("temperature: " + temp + " F" + "<br><br>")
            var humidity = response.main.humidity
            p.append("humidity: " + humidity + "<br></br>")
            col.append(h3, p)
            row.html(col)
            $("#dashboard").prepend(row)
            var windSpeed = response.wind.speed
            p.append("wind speed: " + windSpeed + "<br></br>")






            var lat = response.coord.lat
            var lon = response.coord.lon
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon,
                method: "GET"
            }).then(function (response2) {
                const uvIndex = response2[0].value
               
                p.append("uv: " + uvIndex + "<br></br>")
            


                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&units=imperial",
                    method: "GET"
                }).then(function (response3) {
                    console.log(response3)
                    var forecasts = response3.list
                    $(".forecast-row").empty()
                    for (let i = 1; i < forecasts.length && i < 6; i++) {

                        $(".forecast-row").append(`<div class='col weather-future' data-id=${i}>Temperature: ${Math.round(forecasts[i].main.temp)}</div>
                        <img src=${`https://openweathermap.org/img/w/${forecasts[i].weather[0].icon}.png`}></img>
                        `)
                    }

                })
            })
           

            // $('#forecast').empty();

            // var colOne = $("<div class='col-sm-2'>")
            // var rowOne = $("<div class='row'>")




            // $("#forecast").append(rowOne).append(colOne)
        })



    


        //API call:5 day forcast
        // api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
        // Parameters:
        // q city name and country code divided by comma, use ISO 3166 country codes

        // Examples of API calls:
        // api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml






    })


})



































