//--- SEARCH BAR ---//
const searchContainer = document.querySelector(".search-container");
const searchHTML = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
`;
//--- GALLERY ---//
const galleryContainer = document.querySelector("#gallery");
const galleryHTML = `
  <div class="card">
      <div class="card-img-container">
          <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">first last</h3>
          <p class="card-text">email</p>
          <p class="card-text cap">city, state</p>
      </div>
  </div>
`;


searchContainer.insertAdjacentHTML("beforeend", searchHTML);
galleryContainer.insertAdjacentHTML("beforeend", galleryHTML);

