// https://papajoke.p.rapidapi.com/api/jokes

const jokeApiButton = document.getElementById("joke-api");

const handleButtonClick = () => {
  console.log("clicked");

  // requires a URL
  const url = "https://papajoke.p.rapidapi.com/api/jokes";

  // requires a HTTP method
  // optional headers
  // optional path params
  // optional query params

  const fetchOptions = {
    method: "GET",
  };

  fetch(url, fetchOptions);
};

jokeApiButton.addEventListener("click", handleButtonClick);

$(document).ready = () => {
  handleButtonClick();
};
