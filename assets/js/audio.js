const beachButton = $("#beach-btn");
const skiButton = $("#ski-btn");
const cityButton = $("#city-btn");

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
