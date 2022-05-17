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

  // get jokes from data
  const jokes = data.items;
  console.log(jokes);

  const randomIndex = Math.floor(Math.random() * jokes.length);
  console.log(randomIndex);
  const randomJoke = jokes[randomIndex];
  console.log(randomJoke);
};

jokeApiButton.addEventListener("click", handleButtonClick);
console.log(jokeApiButton);

//get path for joke

//append to main
