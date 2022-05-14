const holidayDropdownButton = $("#holiday-dropdown-btn");

const holidayDropdown = $("#holiday-dropdown");

const dropdownMenu = $("#dropdown-menu");

const holidaySpan = $("#holiday-span");

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

const startHolidayExperience = (event) => {
  const target = $(event.target);
  if (target.is('div[name="holiday-type"]')) {
    const holidayType = target.attr("id");
    console.log(holidayType);
    holidayDropdown.toggleClass("is-active");
    const displayLabel = target.attr("data-label");
    holidaySpan.text(displayLabel);
    window.location.replace(`#${holidayType}`);
  }
};

holidayDropdownButton.click(holidayDropdownToggle);

dropdownMenu.click(startHolidayExperience);

$(document).ready(() => {
  handleNavBarToggle();
});

/* MUSIC JAVASCRIPT */

const beachButton = $("#beach");
const skiButton = $("#ski");
const cityButton = $("#cityBreak");

const beachSongs = ["swim-good.mp3", "summer-time.mp3"];
const skiSongs = [];
const cityBreakSongs = [];

let audio;

const getRandomItemFromArray = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getTrackName = (holidayType) => {
  let randomTrack;

  if (holidayType === "beach") {
    randomTrack = getRandomItemFromArray(beachSongs);
  }

  if (holidayType === "ski") {
    randomTrack = getRandomItemFromArray(skiSongs);
  }

  if (holidayType === "cityBreak") {
    randomTrack = getRandomItemFromArray(cityBreakSongs);
  }

  return randomTrack;
};

const playRandomSong = (holidayType) => {
  stopAllAudio();

  const randomTrack = getTrackName(holidayType);
  const randomAudioPath = `./assets/audio/${randomTrack}`;

  audio = new Audio(randomAudioPath);

  audio.play();
};

const stopAllAudio = () => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
};

const beachMusic = () => {
  playRandomSong("beach");
};

const skiMusic = () => {
  playRandomSong("ski");
};

const cityMusic = () => {
  playRandomSong("cityBreak");
};

beachButton.click(beachMusic);

skiButton.click(skiMusic);

cityButton.click(cityMusic);
