// https://papajoke.p.rapidapi.com/api/jokes

const jokeApiButton = document.getElementById("joke-api");

const handleButtonClick = () => {
  // requires a URL
  const url = "https://papajoke.p.rapidapi.com/api/jokes";

  // requires a HTTP method
  // optional headers
  // optional path params
  // optional query params

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "papajoke.p.rapidapi.com",
      "X-RapidAPI-Key": "ca45ec61a4msh24fe699dc35cc23p1151b5jsn5e05295b9d8f",
    },
  };

  const displayResults = (response) => {
    console.log("displayResults");
    console.log(response);
  };

  fetch("https://papajoke.p.rapidapi.com/api/jokes", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  const data = fetch(url, options).then(displayResults);

  console.log(data);
};

jokeApiButton.addEventListener("click", handleButtonClick);

$(document).ready = () => {
  handleButtonClick();
};
