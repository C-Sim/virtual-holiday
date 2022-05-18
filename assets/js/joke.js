// https://papajoke.p.rapidapi.com/api/jokes

const apiKey = "ca45ec61a4msh24fe699dc35cc23p1151b5jsn5e05295b9d8f";

const jokeApiButton = document.getElementById("joke-api");

// target main to append joke to

const mainContainer = document.getElementById("main-container-joke");

const handleButtonClick = async () => {
  // requires a URL
  const url = "https://papajoke.p.rapidapi.com/api/jokes";

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
  const headline = randomJoke.headline;
  console.log(headline);
  const punchline = randomJoke.punchline;
  console.log(punchline);
  mainContainer.append(`${headline}`);
};

jokeApiButton.addEventListener("click", handleButtonClick);
console.log(jokeApiButton);

//get path for joke

//append to main
// $ get path for joke from object

//open a pull request

//someone approve it and then I will merge it
