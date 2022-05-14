const beachSongs = [
  "highwave.mp3",
  "island.mp3",
  "lost.mp3",
  "ginger.mp3",
  "soco.mp3",
];
const skiSongs = ["winter-magic.mp3", "acoustic-guitar.mp3", "dream-koala.mp3"];
const cityBreakSongs = [
  "city-life.mp3",
  "dont-matter.mp3",
  "maria.mp3",
  "mia.mp3",
  "human-nature.mp3",
];

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
