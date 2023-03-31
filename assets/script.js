var input = document.querySelector(".input");
var submitBtn = document.querySelector(".submit");

// this is for the weather icons: https://openweathermap.org/img/w/10d.png



//This is my event listener for the current day
submitBtn.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" + input.value +"&appid=ce895f0400d0fe16be29264e2d060cb6"
    )
    .then(function (response) {
      localFunction();
    return response.json();
  })
.then(function (data) {
    console.log(data);
    var currentDay = document.createElement('div');
    currentDay.classList.add('card');
    currentDay.innerHTML = "<div class='card-body'><h5 class='card-title'>" +
    "Date:" +
    data.dt +
    "</h5><h6 class='card-subtitle mb-2 text-muted'>" +
    "Temperature:" +
    data.main.temp +
    "<h6 class='card-subtitle mb-2 text-muted'>" +
    "Wind Speed" +
    data.wind.speed +
    "<h6 class='card-subtitle mb-2 text-muted'>" +
    "Humidity:" +
    data.main.humidity +
    "<h6></div>";

    var currentDayCard = document.querySelector('.currentday');
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
      localFunction();
      return response.json();
      
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.includes("12:00:00")) {
            console.log(data.list[i]);
            var cardInfo = document.createElement("div");
            cardInfo.classList.add("card");
            cardInfo.innerHTML =
              "<div class='card-body'><h5 class='card-title'>" +
              "Date:" +
              data.list[i].dt_txt +
              "</h5><h6 class='card-subtitle mb-2 text-muted'>" +
              "Temperature:" +
              data.list[i].main.temp +
              "<h6 class='card-subtitle mb-2 text-muted'>" +
              "Wind Speed" +
              data.list[i].wind.speed +
              "<h6 class='card-subtitle mb-2 text-muted'>" +
              "Humidity:" +
              data.list[i].main.humidity +
              "<h6 class='card-subtitle mb-2 text-muted'>" +
              data.list[i].main.humidity +
              "<h6></div>";
            var card = document.querySelector(".card-element");
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
//5 day forcast: Date, icon, weather, conditions, temperature, wind StereoPannerNode, and humidity