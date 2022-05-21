// DECLARATIONS
// CS weather API key
const weather_API_KEY = "7ec1ea2463d21d115915eb7b42565bed";

const apiKey = "ca45ec61a4msh24fe699dc35cc23p1151b5jsn5e05295b9d8f";

const snacks_API_KEY = "a03019689amshf53ea6e702883adp12db0ajsnb0cacc3b0328";

const mainView = $(".main-container");

const consoleContainer = $("#console-container");

const webcamDiv = $("#webcam-section");

const webcamContainer = $("#holiday-experience");

const weatherContainer = $("#weather-container");

const snacksDiv = $(".snacks-items");

const tempContainer = $("#temperature");

const waiterContainer = $("#waiter-container");

const holidayDropdownButton = $("#holiday-dropdown-btn");

const holidayDropdown = $("#holiday-dropdown");

const dropdownMenu = $("#dropdown-menu");

const holidaySpan = $("#holiday-span");

const stopBnt = $("#stop");

const welcome = $("#welcome");

const closeModalBtn = $(".modal-close");

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
         <button id="start" class="button is-success is-outlined">
         Play
       </button>
<button id="stop" class="button is-success is-outlined">
         Pause
       </button>
       </div>
     </div>
   </div>
 </div>
</section>`);
};

const renderConsoleData = async (place) => {
  try {
    // fetch weather data
    const weather = await fetchWeatherData(place);

    // render current data
    mainView.append(`<div class="columns is-centered" id="console-container">
      <div class="card column is-centered is-half" id="weather-container">
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

          <div class="content is-size-7-mobile" id="place" data-place="${place}">
            Set your thermostat to recreate the temperature in ${place}.
          </div>
        </div>
      </div>
    
    <div class="card column is-centered is-half" id="waiter-container">
      <div class="card-content" id="bartender-card">
        <div class="media">
          <div class="media-left">
         
            <figure class="image is-5by4 waiter-image">
              <img class="is-rounded" src="./assets/images/${place}-waiter.jpg" alt="Waiter" />
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
    </div>
    </div>`);

    $("#joke-api").click(handleButtonClick);

    // Event listener for snacks button
    $("#offer-snack").click(snacksGenerator);

    $("#stop").click(stopPlaying);

    $("#start").click(startPlaying);

    return true;
  } catch (error) {
    renderError();
    return false;
  }
};

renderHolidaySnapsButton = () => {
  mainView.append(`<div id="holiday-snap"><button id="holiday-snap-btn" class="holiday-snap-btn">
  Save A Holiday Snap
</button><div>`);
};

// TO DO ensure can select other holiday types in dropdown
// TO DO render waiter text using typewriter function
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
  //targets the holiday snap button
  $("#holiday-snap-btn").click(createPostcard);
};

const popUpModal = () => {
  const modal = $(`<div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box m-2">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <h4>
                Thank you for creating your postcard!!
              </h4>
              <div class="subtitle is-6">You can view your postcards <a href=./holiday-snaps.html>here</a> or close this modal and continue your virtual holiday experience.</div>
            </div>
            <div class="field is-grouped">
              <p class="control">
                <button class="button is-danger" id="ok-btn">Close</button>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>`);

  mainView.append(modal);

  const closeModal = () => {
    modal.toggleClass("is-active");

    const saveButton = $("#holiday-snap-btn");

    saveButton.unbind("click", createPostcard);
    saveButton.attr("disabled", true);
    saveButton.toggleClass("saved-postcard");
    saveButton.text("Postcard on its way");
  };

  $(".modal-close").click(closeModal);
  $("#ok-btn").click(closeModal);
};

const renderError = () => {
  const message = "Oops, that didn't work. Please try again.";

  mainView.append(`<h2 class="message">${message}</h2>`);
};

const handleButtonClick = async () => {
  $("#jokesContainer").remove();
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
  const jokeDiv = `<div id="jokesContainer"> <i class="fa-solid fa-face-grin-tongue-wink"></i>${headline} ${punchline}</div>`;

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

  mainView.empty();

  if (target.is('div[name="holiday-type"]')) {
    const holidayType = target.attr("id");

    holidayDropdown.toggleClass("is-active");
    const displayLabel = target.attr("data-label");
    holidaySpan.text(displayLabel);
    // window.location.replace(`#${holidayType}`);

    playRandomSong(holidayType);

    const place = linkPlaceName(holidayType);

    renderWebcamData(place);

    const videoPlayer = document.getElementById("my-video");

    videoPlayer.play();

    await renderConsoleData(place);

    renderHolidaySnapsButton();

    moveDropdown(displayLabel);
  }
};

// get random snack in the array
const getRandomSnacks = (response) => {
  $("#snacksContainer").remove();
  const randomSnack = Math.floor(Math.random() * response.length);
  // create a div section for snacks to appear
  const snacksDiv = `<div id="snacksContainer"> <i class="fa-solid fa-ice-cream"></i>${response[randomSnack].name}</div>`;
  // target the div where text appears
  $("#bartender-card").append(snacksDiv);
};

// snacks api fetch function
const snacksGenerator = async () => {
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
      getRandomSnacks(response);
      // throw error
    } else {
      throw new Error("something went wrong");
    }
  } catch (error) {
    // throw log error
    console.log(error);
  }
};

// stop music function
const stopPlaying = () => {
  let isPlaying = true;

  if (isPlaying === true) {
    audio.pause();
  }
};

// start music function
const startPlaying = () => {
  let isPlaying = false;

  if (isPlaying === false) {
    audio.play();
  }
};

holidayDropdownButton.click(holidayDropdownToggle);

dropdownMenu.click(startHolidayExperience);

const createPostcard = () => {
  // takes the current temperature for holiday type
  const temperature = $("#temperature").attr("data-temperature");
  console.log(temperature);
  // takes the location for the holiday type
  const location = $("#place").attr("data-place");
  console.log(location);

  const postcard = {
    id: uuid.v4(),
    location,
    temperature,
  };

  const postcards = readFromLocalStorage("postcards", []);

  postcards.push(postcard);

  writeToLocalStorage("postcards", postcards);

  console.log(localStorage);

  popUpModal();
};

$(document).ready(() => {
  handleNavBarToggle();
});
