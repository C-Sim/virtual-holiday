// CS weather API key
const weather_API_KEY = "7ec1ea2463d21d115915eb7b42565bed";

// webcam api
const webcam_API_KEY = "YIN80HzTzxRw2dQuGfLYh6Cu3K9miN5E";

const weatherContainer = $("#weather-container");

const webcamContainer = $("#webcam-section");

const main = $("#main-container");

const tempContainer = $("#temperature");

const holidayDropdownButton = $("#holiday-dropdown-btn");

const holidayDropdown = $("#holiday-dropdown");

const dropdownMenu = $("#dropdown-menu");

const holidaySpan = $("#holiday-span");

const countryToCountryCodeMapper = {
  Jamaica: "JM",
  Singapore: "SG",
  Andorra: "AD",
};

const linkPlaceName = (holidayType) => {
  if (holidayType === "beach") {
    return "Jamaica";
  }
  if (holidayType === "cityBreak") {
    return "Singapore";
  }
  if (holidayType === "ski") {
    return "Andorra";
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

const fetchWebcamData = async (place) => {
  // use API to fetch current weather data
  const countryCode = countryToCountryCodeMapper[place];
  const currentWebcamUrl = constructUrl(
    `https://webcamstravel.p.rapidapi.com/webcams/list/country=${countryCode}`,
    {
      lang: "en",
      show: "webcams:image,url,player",
    }
  );
  console.log(currentWebcamUrl);

  // await fetch response
  const currentData = await fetchData(currentWebcamUrl, {
    headers: {
      "X-RapidAPI-Host": "webcamstravel.p.rapidapi.com",
      "X-RapidAPI-Key": "15da2cff6amshd1d5cc2632e414ep10847cjsn54d431a7a66e",
    },
  });

  console.log(currentData);
  // get temperature for place
  // const temp = currentData?.main?.temp || "";
  // const humidity = currentData?.main?.humidity || "";
  // const weatherIcon = currentData?.weather[0].icon || "";

  // // return data retrieved from api
  // return {
  //   temp: temp,
  //   humidity: humidity,
  //   icon: weatherIcon,
  // };
};

const renderWeatherData = async (place) => {
  try {
    // fetch weather data
    const weather = await fetchWeatherData(place);

    // empty container
    weatherContainer.empty();

    // render current data
    weatherContainer.append(`<div class="card-content">
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
        <p class="title is-4 is-size-6-mobile" id="temperature">${weather.temp}&deg;C</p>
        <p class="subtitle is-6 is-size-7-mobile" id="humidity">
          Humidity: ${weather.humidity}&percnt;
        </p>
      </div>
    </div>

    <div class="content is-size-7-mobile">
      Set your thermostat to recreate the temperature in
      ${place}.
    </div>
  </div>`);

    return true;
  } catch (error) {
    renderError();
    return false;
  }
};

const renderWebcamData = async (place) => {
  try {
    // fetch weather data
    const webcam = await fetchWebcamData(place);

    // empty container
    webcamContainer.empty();

    // render current data
    webcamContainer.append(`<div class="section">
      <div class="card webcam-card">
        <div class="card-video">
          <video
            id="my-video"
            class="video-js"
            muted
            loop
            preload="auto"
            width="900"
            height="450"
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173"
            data-setup='{"aspectRatio":"16:9", "fluid": true}'
          >
            <source
              src="./assets/videos/holiday-1.mp4"
              type="video/mp4"
            />
            <p class="vjs-no-js">
              To view this video please enable JavaScript, and consider
              upgrading to a web browser that
              <a
                href="https://videojs.com/html5-video-support/"
                target="_blank"
                >supports HTML5 video</a
              >
            </p>
          </video>
        </div>
        <div class="card-content">
          <div class="content">
            <h4 class="location-title">
              <i class="fas fa-map-marker-alt"></i> Hawaii
            </h4>
            <p>
              It is well known that Hawaii features some of the best
              beaches in the world, but the love for the Hawaiian Islands
              is also found in awe-inspiring waterfalls, bustling
              nightlife. Take a peek at this webcam of Hawaii for a small
              taste of it.
            </p>
          </div>
        </div>
      </div>
    </div>`);

    return true;
  } catch (error) {
    renderError();
    return false;
  }
};

const renderError = () => {
  //    remove existing data from container
  tempContainer.empty();

  const message = "Oops, that didn't work. Please try again.";

  tempContainer.append(`<h2 class="message">${message}</h2>`);
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
};

const startHolidayExperience = async (event) => {
  $("html, body").animate(
    {
      scrollTop: $("#holiday-experience").offset().top,
    },
    800,
    function () {
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = "#holiday-experience";
    }
  );

  const target = $(event.target);
  if (target.is('div[name="holiday-type"]')) {
    const holidayType = target.attr("id");

    holidayDropdown.toggleClass("is-active");
    const displayLabel = target.attr("data-label");
    holidaySpan.text(displayLabel);

    const videoPlayer = document.getElementById("my-video");

    // videoPlayer.requestFullscreen();
    videoPlayer.play();

    playRandomSong(holidayType);

    // const place = linkPlaceName(holidayType);

    // await renderWeatherData(place);

    // await renderWebcamData(place);
  }
};

holidayDropdownButton.click(holidayDropdownToggle);

dropdownMenu.click(startHolidayExperience);

$(document).ready(() => {
  handleNavBarToggle();
});
