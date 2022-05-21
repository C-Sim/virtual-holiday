const renderPostcards = (postcards) => {
  const renderPostcard = (postcard) => {
    //create postcard
    const eachPostcard = ` <div class="card">
    <div class="card-image">
      <img
        class="holiday-images"
        src="./assets/images/card-image.jpg"
        id="postcard-image"
        alt="Placeholder image"
      />
    </div>
    <div class="card-content">
      <p class="card-title has-text-centered">${postcard.location}</p>
      <!-- render user holiday destination in this div  -->
      <div class="holiday-type text-center">
      ${postcard.temperature}
        <!-- use template literal in js  -->
      </div>
    </div>
    <div class="hastags has-text-centered">
      <p>
        <span class="hastag-texts">#Virtual-party-experience</span>
        <span class="hastag-texts">#Living-my-best-life</span>
      </p>
    </div>
    <div class="buttons">
      <button  id="save-btn" class="button is-info is-align-items-center">Save</button>
      <button  id="save-btn" class="button is-info is-align-items-center">Delete</button>
    </div>
  </div>`;
    return eachPostcard;
  };
  return postcards.map(renderPostcard).join("");
};

const onReady = () => {
  const postcards = readFromLocalStorage("postcards");

  const postcardsHTML = renderPostcards(postcards);
  document.querySelector(".main-container").innerHTML = postcardsHTML;
};

const changeImage = () => {
  //get image by id
  const image = document.getElementById("postcard-image")

  //change image src depending on the location
  if () {

  } if {

  } else
}

document.addEventListener("DOMContentLoaded", onReady);
