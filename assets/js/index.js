// CS weather API key
const weather_API_KEY = "7ec1ea2463d21d115915eb7b42565bed";

const tempContainer = $("#temperature");

const navBar = $("");

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

const handleLinkClick = async (event) => {
  // find target from navbar
  const target = $(event.target);

  // if target is holiday type link, record value and write to LS
  if (target.is('li[class="holiday-type"]')) {
    const holidayType = target.attr("id");

    const place = linkPlaceName(holidayType);

    await renderWeatherData(place);

    renderHoliday();
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
  console.log(url);

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
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
  console.log(place);
  const currentWeatherUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      q: place,
      appid: weather_API_KEY,
    }
  );

  console.log(currentWeatherUrl);

  // await fetch response
  const currentData = await fetchData(currentWeatherUrl);

  console.log(currentData);

  //   TODO check structure
  // get temperature for place
  const temp = currentData?.main?.temp || "";

  console.log(temp);

  // return data retrieved from api
  return temp;
};

const renderWeatherData = async (place) => {
  console.log(place);
  try {
    // fetch weather data
    const weatherData = await fetchWeatherData(place);

    console.log(weatherData);

    // empty container
    tempContainer.empty();

    // render current data
    renderTemperature(weatherData);

    return true;
  } catch (error) {
    console.log(error.message);
    renderError();
    return false;
  }
};

const renderTemperature = (data) => {
  console.log(data);
  // render the temperature data and append to section
  //   TODO check data structure
  tempContainer.append(`
  <span>${data.weatherData.main.temp}&deg;C</span>
  `);
};

navBar.click(handleLinkClick);
