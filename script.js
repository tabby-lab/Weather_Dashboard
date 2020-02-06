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


    //When I input a city and click the search btn, the city array is pushed,then saved to local 
    //storage.
    // The .val() method is primarily used to get the values of form elements such as input, select and textarea. When called on an empty collection, it returns undefined.
    function displayCity(){
        $("#displayCity").empty();
        var ul=$("<ul class='list-group'>");
        for (let i=0; i<cityArr.length; i++){
            var li=$("<li class='list-group-item cityList'>");
            li.append(cityArr[i]);
            ul.append(li);
            $("#displayCity").append(ul);
        }
        $(".cityList").on("click", function(){
            var city=$(this).text()
            displayDashboard(city)
        })
    }

        displayCity();
    $("#seachBtn").on("click", function () {
        let city = $("#city").val();
        cityArr.push(city)
        displayCity();
        localStorage.setItem('searchCity',JSON.stringify(cityArr))


        displayDashboard(city);
        
        // Use the [OpenWeather API](https://openweathermap.org/api)
        //- http://api.openweathermap.org/data/2.5/weather
        //- http://api.openweathermap.org/data/2.5/forecast
        //- http://api.openweathermap.org/data/2.5/uvi

        // Now we want to grab the weather api for the city that the user inputs 
        //Needs appid= then my api key then the city and the units=imperial is for the time
        //Grabbing the api using ajax.When using ajax function use .then(function (response). 
       

    })
     
    function displayDashboard(city){
        $("#dashboard").empty();
        let weatherURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + city + "&units=imperial";
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            //.empty deletes the children in this parent div dashboard
           

            //I need to put all of this in the function so t shows up in the output
           //from Moment js... x is for the current date.dt is date and time
            var currentDate = moment(response.dt, "X").format("MM/DD/YYYY")
            //creating a row and col dynamically for the info
            var row = $("<div class='row'>")
            var col = $("<div class='col-sm-9'>")
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
                    var forecasts = response3.list
                   var row=$("<div class='row'>")
                    for (let i = 1; i < forecasts.length && i < 6; i++) {
                        //back ticks multiple line string 
                        //$ and {} is a way to excute js code inside string
                        //nest img inside col
                        $(row).append(`<div class='col-sm-2 weather-future ml-3' data-id=${i}>Temperature: ${Math.round(forecasts[i].main.temp)}<img src=${`https://openweathermap.org/img/w/${forecasts[i].weather[0].icon}.png`}></img></div>`)

                        $("#dashboard").append(row)
                    }

                })
            })
           
        })
    }

})



































