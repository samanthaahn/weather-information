var input = document.querySelector(".input");
var submitBtn = document.querySelector(".submit");


// this is for the weather icons: https://openweathermap.org/img/w/10d.png


//This is my event listener for the current day
submitBtn.addEventListener("click", function () {

  localFunction();
  createBtn();

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" + input.value +"&appid=ce895f0400d0fe16be29264e2d060cb6"
    )
    .then(function (response) {
    return response.json();
  })
.then(function (data) {
    console.log(data);
  var dateCurrent = dayjs.unix(data.dt).format('MM/DD/YYYY');
  var currentDayCard = document.querySelector('.currentday');
  var currentDayIcon = data.weather[0].icon;
  var currentDayIconUrl = `https://openweathermap.org/img/w/${currentDayIcon}.png`
  currentDayCard.innerHTML='';

    var currentDay = document.createElement('div');
    currentDay.classList.add('card');
    currentDay.innerHTML = "<div class='card-body'><h5 class='card-title' id='currentDate'>" + data.name +
    ' ' + dateCurrent + "<img id='icon' src='" + currentDayIconUrl +"'>" +
    "</h5><h6 class='card-subtitle mb-2 text-muted'>" +
    "Temperature: " +
    data.main.temp + '°F' +
    "<h6 class='card-subtitle mb-2 text-muted'>" +
    "Wind Speed " +
    data.wind.speed + ' MPH' +
    "<h6 class='card-subtitle mb-2 text-muted'>" +
    "Humidity: " +
    data.main.humidity + '%' +
    "<h6></div>";
    
    currentDayCard.append(currentDay);

  }
  )}
);

// This is my event listener for my 5-day forcast
submitBtn.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      input.value +
      "&appid=ce895f0400d0fe16be29264e2d060cb6"
  )
    .then(function (response) {
      return response.json();
      
    })
    .then(function (data) {
      console.log(data);
      var card = document.querySelector(".card-element");
      card.innerHTML='';

      for (var i = 0; i < data.list.length; i++) {
        var fiveDay = dayjs(data.list[i].dt_txt ).format('MM/DD/YYYY');
        if (data.list[i].dt_txt.includes("12:00:00")) {
            console.log(data.list[i]);
            var fiveDayIcon = data.list[i].weather[0].icon;
            var fiveDayIconUrl = `https://openweathermap.org/img/w/${fiveDayIcon}.png`
            var cardInfo = document.createElement("div");
            cardInfo.classList.add("card");
            cardInfo.innerHTML =
              "<div class='card-body'><h5 class='card-title' id='forcastdate'><img id='icon' src='" + fiveDayIconUrl +"'>" +
              fiveDay + 
              "</h5><h6 class='card-subtitle mb-2 text-muted'>" +
              "Temperature: " + 
              data.list[i].main.temp + '°F' +
              "<h6 class='card-subtitle mb-2 text-muted'>" +
              "Wind Speed: " +
              data.list[i].wind.speed + 'MPH' +
              "<h6 class='card-subtitle mb-2 text-muted'>" +
              "Humidity: " +
              data.list[i].main.humidity + '%' +
              "<h6></div>";
            
            card.append(cardInfo);
          }
      }
    });
});

function localFunction () {
var searchedCity = JSON.parse(localStorage.getItem('searchedCity'));

      if (!searchedCity){
      localStorage.setItem('searchedCity', JSON.stringify([input.value]));
      }else {
      searchedCity.push(input.value);  
      localStorage.setItem('searchedCity', JSON.stringify(searchedCity));
      }
    }

    function createBtn () {
      var cityResponse = JSON.parse(localStorage.getItem('searchedCity'));
      var searchHistory = document.querySelector(".searchhistory");
      searchHistory.innerHTML='';
      for (var i = 0; i < cityResponse.length; i++) {
        var searchHistoryBtn = document.createElement("button");
        searchHistoryBtn.setAttribute('data-city',cityResponse[i]);
        searchHistoryBtn.innerText=cityResponse[i];
        searchHistory.append(searchHistoryBtn);
      }
    }

//activity 20 unity 4 
// var searchThings = function(searchedCity){
//   var exists = cityResponse && cityResponse.inclues(searchedCity);
//   if(exists) {
//   }else{
    
//   }
// }

//5 day forcast: Date, icon, weather, conditions, temperature, wind StereoPannerNode, and humidity