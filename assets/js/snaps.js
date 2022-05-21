const mainContainer = $(".main-container");

const handleClick = (event) => {
  const target = $(event.target);
  if (target.is('button[name="delete-btn"]')) {
    const postcardId = target.attr("id");

    const postcards = readFromLocalStorage("postcards", []);

    // filter out the postcard
    const filteredPostcards = postcards.filter((postcard) => {
      return postcard.id !== postcardId;
    });

    writeToLocalStorage("postcards", filteredPostcards);

    renderPostcards(filteredPostcards);
  }
};

const renderPostcards = (postcards) => {
  mainContainer.empty();

  const renderPostcard = (postcard) => {
    //create postcard
    const eachPostcard = `<div class="card p-6 m-6">
    <p class="card-title has-text-centered">Wish you were here in ${postcard.location}!</p>
      <div class="card-image">
        <img
          class="card-image holiday-images"
          src="./assets/images/${postcard.location}.jpg"

          id="postcard-image"
          alt="Placeholder image"
        />
      </div>
      <div class="card-content">
        

        <div class="holiday-type">
       <p>Where the current temp is: ${postcard.temperature}&deg;C</p>
        </div>

        <div>The best food I had on holiday was </div>
      </div>

      <div class="hastags has-text-centered">
        <p>
          <span class="hastag-texts">#Virtual-holiday-experience</span>
          <span class="hastag-texts">#Living-my-best-life</span>
        </p>
      </div>
      <div class="buttons">
        <button name="delete-btn" id="${postcard.id}" class="button is-info is-align-items-center">Delete</button>
      </div>
    </div>`;

    return eachPostcard;
  };

  const postcardsHTML = postcards.map(renderPostcard).join("");

  mainContainer.append(postcardsHTML);

  mainContainer.click(handleClick);
};

const onReady = () => {
  const postcards = readFromLocalStorage("postcards", []);

  renderPostcards(postcards);
};

$(document).ready(onReady);
