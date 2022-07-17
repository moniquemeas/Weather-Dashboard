var cityEl = document.getElementById("searchCity");
var outputHeader = document.querySelector("#cityContainer");
var foreCast = document.querySelector(".forecastDay")
var uVCondition = document.querySelector("#uvCode");
var InputBtn = document.querySelector("#cityInput");
var fiveDayForecast = document.getElementById("fiveDayCast");
var searchContainer = document.querySelector(".inputContainer");
var uvStatus = document.querySelector("#uVvalue");

// submit function
var submitHandler = function(e){
  e.preventDefault();

  var cityName = cityEl.value;
  getWeather(cityName)

  //applied class to element.
  outputHeader.classList.add("outputContainer");
  document.getElementById("firstDay").classList.add("forecastBg");
  document.getElementById("secondDay").classList.add("forecastBg");
  document.getElementById("thirdDay").classList.add("forecastBg");
  document.getElementById("fourthDay").classList.add("forecastBg");
  document.getElementById("fifthDay").classList.add("forecastBg");

// applied 5 day forecast text

fiveDayForecast.innerText = "5-Day Forecast"

//Create history button
var weatherHist = document.createElement("button");
weatherHist.classList.add("trackBtn");
weatherHist.innerText = cityName;
searchContainer.appendChild(weatherHist);
weatherHist.addEventListener("click", function(){

  //pull data from local storage
  JSON.parse(localStorage.getItem(getWeather(cityName)));
})


}


  getWeather =  function(city){
    //fetch API 
    fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=850a623db80245b3bf1224608221507&q="+ city +"&days=6&aqi=no&alerts=no"
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data))
  },

  displayWeather = function(data){
    
    //assigned element
    var currentLocation = document.querySelector(".city");
    var currentDate = document.querySelector(".date");
    var currentIcon = document.querySelector(".icon");
    var currentTemp = document.querySelector(".temp");
    var currentWind = document.querySelector(".wind");
    var currentHumidity = document.querySelector(".humidity");
    var currentUv = document.querySelector(".uv");
    var uvIndex = data.current.uv;

    //assigned current data to element
    currentLocation.innerText = data.location.name;
    currentDate.innerText = data.location.localtime;
    currentIcon.src = data.current.condition.icon;
    currentTemp.innerText = "Temp: " + data.current.temp_f + " °F"
    currentWind.innerText = "Wind: " + data.current.wind_mph + " MPH"
    currentHumidity.innerText = "Humidity: " + data.current.humidity + "%"

    // display uv value and condition
    currentUv.innerText = "UV Index: ";
    
    if (uvIndex < 3){
      uvStatus.innerText = uvIndex;
      uvStatus.classList.add("favorableUv");
    } else if (uvIndex > 3 && uvIndex < 8) {
      uvStatus.innerText = uvIndex;
    uvStatus.classList.add("moderateUv");
    } else if (uvIndex >= 8) {
      uvStatus.innerText = uvIndex;
    uvStatus.classList.add("serverUv");
    }


    // assigned data to forecast element
    //First forecast
    document.querySelector(".firstDate").innerText = data.forecast.forecastday[1].date;
    document.querySelector(".firstTemp").innerText = "Temp: " + data.forecast.forecastday[1].day.avgtemp_f + " °F"
    document.querySelector(".firstWind").innerText = "Wind: " + data.forecast.forecastday[1].day.avgvis_miles + " MPH"
    document.querySelector(".firstHumidity").innerText = "Humidity: " + data.forecast.forecastday[1].day.avghumidity + "%";
    document.querySelector(".firstIcon").src= data.forecast.forecastday[1].day.condition.icon;

    //second forecast
    document.querySelector(".secondDate").innerText = data.forecast.forecastday[2].date;
    document.querySelector(".secondTemp").innerText = "Temp: " + data.forecast.forecastday[2].day.avgtemp_f + " °F";
    document.querySelector(".secondIcon").src = data.forecast.forecastday[2].day.condition.icon;
    document.querySelector(".secondWind").innerText = "Wind: " + data.forecast.forecastday[2].day.avgvis_miles + " MPH";
    document.querySelector(".secondHumidity").innerText = "Humidity: " + data.forecast.forecastday[2].day.avghumidity + "%";

    //third forecast
    document.querySelector(".thirdDate").innerText = data.forecast.forecastday[3].date;
    document.querySelector(".thirdTemp").innerText = "Temp: " + data.forecast.forecastday[3].day.avgtemp_f + " °F";
    document.querySelector(".thirdIcon").src = data.forecast.forecastday[3].day.condition.icon;
    document.querySelector(".thirdWind").innerText = "Wind: " + data.forecast.forecastday[3].day.avgvis_miles + " MPH";
    document.querySelector(".thirdHumidity").innerText = "Humidity: " + data.forecast.forecastday[3].day.avghumidity + "%";

    //fourth forecast
    document.querySelector(".fourthDate").innerText = data.forecast.forecastday[4].date;
    document.querySelector(".fourthTemp").innerText = "Temp: " + data.forecast.forecastday[4].day.avgtemp_f + " °F";
    document.querySelector(".fourthIcon").src = data.forecast.forecastday[4].day.condition.icon;
    document.querySelector(".fourthWind").innerText = "Wind: " + data.forecast.forecastday[4].day.avgvis_miles + " MPH";
    document.querySelector(".fourthHumidity").innerText = "Humidity: " + data.forecast.forecastday[4].day.avghumidity + "%";

    //fifth forecast
    document.querySelector(".fifthDate").innerText = data.forecast.forecastday[5].date;
    document.querySelector(".fifthTemp").innerText = "Temp: " + data.forecast.forecastday[5].day.avgtemp_f + " °F";
    document.querySelector(".fifthIcon").src = data.forecast.forecastday[5].day.condition.icon;
    document.querySelector(".fifthWind").innerText = "Wind: " + data.forecast.forecastday[5].day.avgvis_miles + " MPH";
    document.querySelector(".fifthHumidity").innerText = "Humidity: " + data.forecast.forecastday[5].day.avghumidity + "%";

  // save data to local storage
  localStorage.setItem("data", JSON.stringify(data));
  }
  InputBtn.addEventListener("click", submitHandler);


    
    



        

    
