const weather_API_KEY = "7ec1ea2463d21d115915eb7b42565bed";

const joke_API_KEY = "ca45ec61a4msh24fe699dc35cc23p1151b5jsn5e05295b9d8f";

const snacks_API_KEY = "a03019689amshf53ea6e702883adp12db0ajsnb0cacc3b0328";

const mainView = $(".main-container");

const holidayDropdownButton = $("#holiday-dropdown-btn");

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
  const currentWeatherUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      q: place,
      units: "metric",
      appid: weather_API_KEY,
    }
  );

  const currentData = await fetchData(currentWeatherUrl);

  const temp = currentData?.main?.temp || "";
  const humidity = currentData?.main?.humidity || "";
  const weatherIcon = currentData?.weather[0].icon || "";

  return {
    temp: temp,
    humidity: humidity,
    icon: weatherIcon,
  };
};

const renderWebcamData = (place) => {
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
       <div class="card-content is-centered">
         <div class="content">
           <h4 class="location-title">
             <i class="fas fa-map-marker-alt"></i> ${place}
           </h4>
         </div>
         <div class="buttons is-centered">
         <a id="start" class="button is-light">Play Music </a>
         <a id="stop" class="button is-light">Pause Music </a>
       </div>
     </div>
   </div>
 </div>
</section>`);
};

const renderWeatherCard = (weather, place) => {
  return `<div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-96x96 ml-6">
          <img
            src="http://openweathermap.org/img/w/${weather.icon}.png"
            alt="Weather Icon"
          />
        </figure>
      </div>
      <div class="media-content weather-content">
        <p class="title is-4 is-size-6-mobile pt-3" id="temperature" data-temperature="${weather.temp}">
          ${weather.temp}&deg;C
        </p>
        <p class="subtitle is-6 is-size-7-mobile" id="humidity">
          Humidity: ${weather.humidity}&percnt;
        </p>
      </div>
    </div>
    <div class="content is-6 is-size-6-mobile" id="place" data-place="${place}">
      Set your thermostat to recreate the temperature in ${place}.
    </div>
  </div>`;
};

const renderConsoleData = async (place) => {
  try {
    const weather = await fetchWeatherData(place);

    mainView.append(`<div class="columns is-centered" id="console-container">
      <div class="card column is-centered has-text-centered is-half" id="weather-container">
        ${renderWeatherCard(weather, place)}
      </div>
    
      <div class="card column is-centered" id="waiter-container">
        <div class="card-content has-text-centered" id="bartender-card">
        <div class="content is-size-6-mobile title is-5" id="welcome"></div>
          <div class="media waiter-interact">
            <div class="media-left">
              <figure class="image is-128x128 waiter-image">
                <img class="is-rounded ml-3 mt-2" src="./assets/images/${place}-waiter.jpg" alt="Waiter" />
              </figure>
            </div>
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
        <div id="waiter-provision" class="has-text-centered"></div>
      </div>
    </div>`);

    const typewriter = new Typewriter(document.getElementById("welcome"), {
      loop: true,
    });

    typewriter
      .typeString("Welcome to the restaurant.")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Can I offer you some entertainment?")
      .pauseFor(1000)
      .deleteChars(20)
      .typeString(" some food?")
      .pauseFor(1000)
      .start();

    $("#joke-api").click(handleJokeButtonClick);

    $("#offer-snack").click(snacksGenerator);

    $("#stop").click(stopPlaying);

    $("#start").click(startPlaying);

    return true;
  } catch (error) {
    renderError();
    return false;
  }
};

const renderHolidaySnapsButton = () => {
  mainView.append(`<div id="holiday-snap"><button id="holiday-snap-btn" class="holiday-snap-btn">
  Save A Holiday Snap
</button><div>`);
};

const moveDropdown = (displayLabel) => {
  mainView.append(`<div class="is-flex is-justify-content-center m-4">
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
            class="dropdown-item is-clickable has-text-centered"
            id="beach"
            data-label="Beach Holiday"
          >
            Beach Holiday
          </div>
          <hr class="dropdown-divider" />
          <div
            name="holiday-type"
            class="dropdown-item is-clickable has-text-centered"
            id="cityBreak"
            data-label="City Break"
          >
            City Break
          </div>
          <hr class="dropdown-divider" />
          <div
            name="holiday-type"
            class="dropdown-item is-clickable has-text-centered"
            id="ski"
            data-label="Ski Trip"
          >
            Ski Trip
          </div>
        </div>
      </div>
    </div>
  </div>`);

  $("#holiday-dropdown-btn").click(holidayDropdownToggleOnIndex);
  $("#dropdown-menu").click(startHolidayExperience);

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
    saveButton.text("Postcard saved in Holiday Snaps!");
  };

  $(".modal-close").click(closeModal);
  $("#ok-btn").click(closeModal);
};

const renderError = () => {
  const message = "Oops, that didn't work. Please try again.";

  mainView.append(`<h2 class="message">${message}</h2>`);
};

const handleJokeButtonClick = async () => {
  const waiterProvision = $("#waiter-provision");

  const url = "https://papajoke.p.rapidapi.com/api/jokes";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "papajoke.p.rapidapi.com",
      "X-RapidAPI-Key": joke_API_KEY,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  const jokes = data.items;

  const randomIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomIndex];
  const headline = randomJoke.headline;
  const punchline = randomJoke.punchline;
  const jokeDiv = `<div id="jokesContainer"> <i class="fa-solid fa-face-grin-tongue-wink"></i> ${headline}</br>${punchline}</div>`;

  waiterProvision.empty();

  waiterProvision.append(jokeDiv);
};

const holidayDropdownToggleOnIndex = () => {
  $("#holiday-dropdown").toggleClass("is-active");
};

const startHolidayExperience = async (event) => {
  const target = $(event.target);

  mainView.empty();

  if (target.is('div[name="holiday-type"]')) {
    const holidayType = target.attr("id");

    $("#holiday-dropdown").toggleClass("is-active");
    const displayLabel = target.attr("data-label");
    holidaySpan.text(displayLabel);

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

const getRandomSnacks = (response) => {
  const waiterProvision = $("#waiter-provision");

  const randomSnack = Math.floor(Math.random() * response.length);

  const snacksDiv = `<div id="snacksContainer"> <i class="fa-solid fa-ice-cream mr-2"></i>${response[randomSnack].name}</div>`;

  waiterProvision.empty();

  waiterProvision.append(snacksDiv);
};

const snacksGenerator = async () => {
  try {
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
      const response = await data.json();
      getRandomSnacks(response);
    } else {
      throw new Error("something went wrong");
    }
  } catch (error) {}
};

const stopPlaying = () => {
  let isPlaying = true;

  if (isPlaying === true) {
    audio.pause();
  }
};

const startPlaying = () => {
  let isPlaying = false;

  if (isPlaying === false) {
    audio.play();
  }
};

holidayDropdownButton.click(holidayDropdownToggleOnIndex);

dropdownMenu.click(startHolidayExperience);

const createPostcard = () => {
  const temperature = $("#temperature").attr("data-temperature");

  const location = $("#place").attr("data-place");

  const postcard = {
    id: uuid.v4(),
    location,
    temperature,
  };

  const postcards = readFromLocalStorage("postcards", []);

  postcards.unshift(postcard);

  writeToLocalStorage("postcards", postcards);

  popUpModal();
};

$(document).ready(() => {
  handleNavBarToggle();
});
