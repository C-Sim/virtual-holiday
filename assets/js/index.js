// DECLARATIONS
// CS weather API key
const weather_API_KEY = "7ec1ea2463d21d115915eb7b42565bed";

// webcam api
const webcam_API_KEY = "YIN80HzTzxRw2dQuGfLYh6Cu3K9miN5E";

const snacks_API_KEY = "a03019689amshf53ea6e702883adp12db0ajsnb0cacc3b0328"

const weatherContainer = $("#weather-container");

const webcamDiv = $("#webcam-section");

const webcamContainer = $("#holiday-experience");

const mainView = $(".main-container");

const tempContainer = $("#temperature");

const holidayDropdownButton = $("#holiday-dropdown-btn");

const holidayDropdown = $("#holiday-dropdown");

const dropdownMenu = $("#dropdown-menu");

const holidaySpan = $("#holiday-span");

const generateSnacksBtn = $("#snacks-button");

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

// fn to render webcam on page after drop down click
const renderWebcamData = (place) => {
  // append the html on to the page with correct webcam
  mainView.append(`<section class="packages" id="holiday-experience">
 <div id="webcam-section">
   <div class="section">
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
           poster="./assets/images/${place}.jpg"
           data-setup='{"aspectRatio":"16:9", "fluid": true}'
         >
           <source 
             src="./assets/videos/${place}.mp4"
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
             <i class="fas fa-map-marker-alt"></i> ${place}
           </h4>
         </div>
       </div>
     </div>
   </div>
 </div>
</section>`);
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
  // $("html, body").animate(
  //   {
  //     scrollTop: $("#holiday-experience").offset().top,
  //   },
  //   800,
  //   function () {
  //     // Add hash (#) to URL when done scrolling (default click behavior)
  //     window.location.hash = "#holiday-experience";
  //   }
  // );

  const target = $(event.target);
  if (target.is('div[name="holiday-type"]')) {
    const holidayType = target.attr("id");

    holidayDropdown.toggleClass("is-active");
    const displayLabel = target.attr("data-label");
    holidaySpan.text(displayLabel);

    playRandomSong(holidayType);

    const place = linkPlaceName(holidayType);

    await renderWeatherData(place);

    renderWebcamData(place);

    const videoPlayer = document.getElementById("my-video");

    // videoPlayer.requestFullscreen();
    videoPlayer.play();
  }
};

// snacks api fetch function
const snacks = () => {
  try {
    // make request to API
    const data = await fetch(
      "https://pizza-and-desserts.p.rapidapi.com/desserts",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "pizza-and-desserts.p.rapidapi.com",
          "X-RapidAPI-Key": snacks_API_KEY,
        },
      }
    );
    if (data.status === 200) {
      // if successful display date
      const response = await data.json();
      getRandomFood(response);
      // throw error
    } else {
      throw new Error("something went wrong");
    }
  } catch (error) {
    // throw log error
    console.log(error);
  }

};

// Event listener for snacks button
generateSnacksBtn.click(snacks);

holidayDropdownButton.click(holidayDropdownToggle);

dropdownMenu.click(startHolidayExperience);

$(document).ready(() => {
  handleNavBarToggle();
});
