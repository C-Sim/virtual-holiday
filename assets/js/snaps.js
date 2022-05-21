const mainContainer = $(".main-container");

const handleClick = (event) => {
  const target = $(event.target);
  if (target.is('button[name="delete-btn"]')) {
    const postcardId = target.attr("id");
    console.log(postcardId);
  }
};

const renderPostcards = (postcards) => {
  const renderPostcard = (postcard) => {
    //create postcard
    const eachPostcard = ` <div class="card">
      <div class="card-image">
        <img
          class="holiday-images"
          src="./assets/images/${postcard.location}.jpg"

          id="postcard-image"
          alt="Placeholder image"
        />
      </div>
      <div class="card-content">
        <p class="card-title has-text-centered">${postcard.location}</p>
        <!-- render user holiday destination in this div  -->
        <div class="holiday-type text-center">
        ${postcard.temperature}&deg;C
          <!-- use template literal in js  -->
        </div>
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

  return postcards.map(renderPostcard).join("");
};

const onReady = () => {
  const postcards = readFromLocalStorage("postcards");

  const postcardsHTML = renderPostcards(postcards);

  mainContainer.append(postcardsHTML);

  mainContainer.click(handleClick);
};

$(document).ready(onReady);
