const beachSongs = ["swim-good.mp3", "summer-time.mp3"];
const skiSongs = [];
const cityBreakSongs = [];

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

//start the experience will call getTrackName

const playRandomSong = () => {
  const randomTrack = getTrackName("beach");
  console.log(randomTrack);

  const randomAudioPath = `./assets/audio/${randomTrack}`;
  console.log(randomAudioPath);

  const audio = new Audio(randomAudioPath);

  // audio.play();

  console.log(audio);
};

$("#start-btn").click(playRandomSong);
