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

  outputHeader.classList.add("outputContainer");
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
    .catch(error => alert("Please enter the city name."))
    
  }

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

      // assigned color green to uvIndex
      uvStatus.classList = ["favorableUv"]

    } else if (uvIndex > 3 && uvIndex < 8) {
      uvStatus.innerText = uvIndex;

    // assigned color yellow to uvIndex
    uvStatus.classList = ["moderateUv"]
    } else if (uvIndex >= 8) {
      uvStatus.innerText = uvIndex;

    // assigned color red to uvIndex
    uvStatus.classList = ["servereUv"]
    }

    //remove first array

    data.forecast.forecastday.shift()
  
    // assigned data to new Elements
    var futureForecast = data.forecast.forecastday.map(forecastday => {
      
      return `<div class="forecastBg">
      <h4>${forecastday.date}</h4>
      <img src = ${forecastday.day.condition.icon} />
      <p>Temp: ${forecastday.day.avgtemp_f} °F</p>
      <p>Wind: ${forecastday.day.avgvis_miles} MPH</p>
      <p>Humidity: ${forecastday.day.avghumidity}%</p>
      </div>`
    }).join('');
    
    console.log(futureForecast)
    document.querySelector('#forecast').innerHTML = futureForecast

  

  // save data to local storage
  localStorage.setItem("data", JSON.stringify(data));
  }

  InputBtn.addEventListener("click", submitHandler);
