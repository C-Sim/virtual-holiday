// https://papajoke.p.rapidapi.com/api/jokes

const apiKey = "ca45ec61a4msh24fe699dc35cc23p1151b5jsn5e05295b9d8f";

const jokeApiButton = document.getElementById("joke-api");

const handleButtonClick = async () => {
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
      "X-RapidAPI-Key": apiKey,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);

  // get jokes from data
};

jokeApiButton.addEventListener("click", handleButtonClick);
console.log(jokeApiButton);
