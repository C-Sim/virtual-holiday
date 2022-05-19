// CS weather API key
const weather_API_KEY = "7ec1ea2463d21d115915eb7b42565bed";

const apiKey = "ca45ec61a4msh24fe699dc35cc23p1151b5jsn5e05295b9d8f";

const mainView = $(".main-container");

const consoleContainer = $("#console-container");

const weatherContainer = $("#weather-container");

const tempContainer = $("#temperature");

const waiterContainer = $("#waiter-container");

const holidayDropdownButton = $("#holiday-dropdown-btn");

const holidayDropdown = $("#holiday-dropdown");

const dropdownMenu = $("#dropdown-menu");

const holidaySpan = $("#holiday-span");

const welcome = $("#welcome");

//const holidaySnapBtn = $("#holiday-snap-btn");

// const typewriter = new Typewriter(welcome, {
//   loop: true,
// });

// typewriter
//   .typeString("Welcome to the restaurant.")
//   .pauseFor(2500)
//   .deleteAll()
//   .typeString("Can I offer you some food?")
//   .pauseFor(2500)
//   .deleteChars(11)
//   .typeString("some entertainment?")
//   .pauseFor(2500)
//   .start();

const linkPlaceName = (holidayType) => {
  if (holidayType === "beach") {
    return "Jamaica";
  }
  if (holidayType === "cityBreak") {
    return "New York";
  }
  if (holidayType === "ski") {
    return "Aspen";
  }
};

const writeToLocalStorage = (key, value) => {
  // stringify object value
  const stringifiedValue = JSON.stringify(value);
  // set value for each key within LS
  localStorage.setItem(key, stringifiedValue);
};

const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchWeatherData = async (place) => {
  // use API to fetch current weather data
  const currentWeatherUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      q: place,
      units: "metric",
      appid: weather_API_KEY,
    }
  );

  // await fetch response
  const currentData = await fetchData(currentWeatherUrl);

  // get temperature for place
  const temp = currentData?.main?.temp || "";
  const humidity = currentData?.main?.humidity || "";
  const weatherIcon = currentData?.weather[0].icon || "";

  // return data retrieved from api
  return {
    temp: temp,
    humidity: humidity,
    icon: weatherIcon,
  };
};

const renderConsoleData = async (place) => {
  try {
    // fetch weather data
    const weather = await fetchWeatherData(place);

    // render current data
    mainView.append(`<div class="columns is-centered" id="console-container">
      <div class="card column" id="weather-container">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  src="http://openweathermap.org/img/w/${weather.icon}.png"
                  alt="Weather Icon"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4 is-size-6-mobile" id="temperature" data-temperature="${weather.temp}">
                ${weather.temp}&deg;C
              </p>
              <p class="subtitle is-6 is-size-7-mobile" id="humidity">
                Humidity: ${weather.humidity}&percnt;
              </p>
            </div>
          </div>

          <div class="content is-size-7-mobile">
            Set your thermostat to recreate the temperature in ${place}.
          </div>
        </div>
      </div>
    </div>
    <div class="card column" id="waiter-container">
      <div class="card-content" id="bartender-card">
        <div class="media">
          <div class="media-left">
         
            <figure class="image waiter-image">
              <img src="./assets/images/${place}-waiter.jpg" alt="Waiter" />
            </figure>
          </div>
          <div id="welcome">Welcome to the restaurant. Can I offer you some food? Some entertainment?</div>

          <div class="media-content waiter-buttons">
            <button class="console-btn" id="joke-api">
              Tell Me A Joke
            </button>
            <button class="console-btn" id="offer-snack">
              Offer Me A Snack
            </button>
          </div>
        </div>
      </div>
    </div>`);

    $("#joke-api").click(handleButtonClick);

    return true;
  } catch (error) {
    renderError();
    return false;
  }
};

renderHolidaySnapsButton = () => {
  mainView.append(`<div id="holiday-snap"><button id="holiday-snap-btn">
  Save A Holiday Snap
</button><div>`);
};

// TO DO ensure can select other holiday types in dropdown
moveDropdown = (displayLabel) => {
  mainView.append(`<div class="is-flex is-justify-content-center">
  <div class="dropdown" id="holiday-dropdown">
    <div class="dropdown-trigger">
      <button
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        id="holiday-dropdown-btn"
      >
        <span id="holiday-span">${displayLabel}</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div
          name="holiday-type"
          class="dropdown-item is-clickable"
          id="beach"
          data-label="Beach Holiday"
        >
          Beach Holiday
        </div>
        <hr class="dropdown-divider" />
        <div
          name="holiday-type"
          class="dropdown-item is-clickable"
          id="cityBreak"
          data-label="City Break"
        >
          City Break
        </div>
        <hr class="dropdown-divider" />
        <div
          name="holiday-type"
          class="dropdown-item is-clickable"
          id="ski"
          data-label="Ski Trip"
        >
          Ski Trip
        </div>
      </div>
    </div>
  </div>
</div>`);
};

const renderError = () => {
  const message = "Oops, that didn't work. Please try again.";

  mainView.append(`<h2 class="message">${message}</h2>`);
};

const handleButtonClick = async () => {
  // requires a URL
  const url = "https://papajoke.p.rapidapi.com/api/jokes";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "papajoke.p.rapidapi.com",
      "X-RapidAPI-Key": apiKey,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  // get jokes from data
  const jokes = data.items;
  console.log(jokes);

  const randomIndex = Math.floor(Math.random() * jokes.length);
  console.log(randomIndex);
  const randomJoke = jokes[randomIndex];
  console.log(randomJoke);
  const headline = randomJoke.headline;
  console.log(headline);
  const punchline = randomJoke.punchline;
  console.log(punchline);
  const jokeDiv = `<div>${headline} ${punchline}</div>`;
  $("#bartender-card").append(jokeDiv);
};

const handleNavBarToggle = () => {
  const navBurgerBtn = $(".navbar-burger");

  const toggleNavBar = () => {
    // get the nav container id (the div to show and hide)
    const navContainerId = navBurgerBtn.attr("data-target");
    const navContainer = $(`#${navContainerId}`);

    // toggle the class for hamburger button to show/hide
    navBurgerBtn.toggleClass("is-active");

    // toggle the class for nav container to show/hide
    navContainer.toggleClass("is-active");
  };

  navBurgerBtn.click(toggleNavBar);
};

const holidayDropdownToggle = () => {
  holidayDropdown.toggleClass("is-active");
  console.log("clicked");
};

const startHolidayExperience = async (event) => {
  const target = $(event.target);

  mainView.empty();

  if (target.is('div[name="holiday-type"]')) {
    const holidayType = target.attr("id");

    holidayDropdown.toggleClass("is-active");
    const displayLabel = target.attr("data-label");
    holidaySpan.text(displayLabel);
    // window.location.replace(`#${holidayType}`);
    // playRandomSong(holidayType);

    const place = linkPlaceName(holidayType);

    await renderConsoleData(place);

    renderHolidaySnapsButton();

    moveDropdown(displayLabel);
  }
};

holidayDropdownButton.click(holidayDropdownToggle);

dropdownMenu.click(startHolidayExperience);

const createPostcard = () => {
  const temperature = $("#temperature").attr("data-temperature");
  console.log(temperature);
};

$("#holiday-snap-btn").click(createPostcard);

$(document).ready(() => {
  handleNavBarToggle();
});
