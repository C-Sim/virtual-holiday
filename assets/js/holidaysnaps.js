const mainContainer = $(".main-container");

const handleClick = (event) => {
  const target = $(event.target);
  if (target.is('button[name="delete-btn"]')) {
    const postcardId = target.attr("id");

    popUpModal(postcardId);
  }
};

const handleConfirmClick = (event) => {
  const target = $(event.target);

  if (target.is('button[name="ok-delete-btn"]')) {
    const postcardId = target.attr("id");

    const postcards = readFromLocalStorage("postcards", []);

    const filteredPostcards = postcards.filter((postcard) => {
      return postcard.id !== postcardId;
    });

    writeToLocalStorage("postcards", filteredPostcards);

    renderPostcards(filteredPostcards);
  }
};

const popUpModal = (postcardId) => {
  const modal = $(`<div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box m-2">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <h4>
                Are you sure you want to delete this memory?
              </h4>
            <div class="field is-grouped">
              <p class="control">
                <button class="button is-danger" name="ok-delete-btn" id="${postcardId}">Yes, I'm Sure</button>
                <button class="button is-success" name="ok-btn">No, I'd Like To Keep It</button>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>`);

  mainContainer.append(modal);

  const closeModal = () => {
    modal.toggleClass("is-active");
  };

  $(".modal-close").click(closeModal);
  $(".is-success").click(closeModal);

  $(".is-danger").click(handleConfirmClick);
};

const renderPostcards = (postcards) => {
  mainContainer.empty();

  const renderPostcard = (postcard) => {
    const eachPostcard = `<div class="card p-6 m-6">
    <img src="./assets/images/virtual-holiday.png" class="card-image" width="100" />
    <p class="card-title has-text-centered is-size-4 is-italic">Wish you were here in ${postcard.location}!</p>
      <div class="card-image">
        <img
          class="card-image holiday-images"
          src="./assets/images/${postcard.location}.jpg"

          id="postcard-image"
          alt="${postcard.location} Placeholder Image"
        />
      </div>
      <div class="card-content">
        

        <div class="holiday-type">
       <p class="has-text-centered">Temperature: ${postcard.temperature}&deg;C</p>
        </div>
      </div>

      <div class="hashtags has-text-centered">
        <p>
          <span class="hashtag-texts">#Virtual-holiday-experience</span>
          <span class="hashtag-texts">#Living-my-best-life</span>
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
  handleNavBarToggle();

  const postcards = readFromLocalStorage("postcards", []);

  renderPostcards(postcards);
};

$(document).ready(onReady);
