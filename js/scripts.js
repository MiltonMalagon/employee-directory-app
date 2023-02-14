document.addEventListener("DOMContentLoaded", async (e) => {
  //--- SEARCH BAR ---//
  const searchContainer = document.querySelector(".search-container");
  const searchHTML = `
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
  `;
  //--- GALLERY ---//
  const gallery = document.querySelector("#gallery");
  
  //--- MODAL ---//
  const modalHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                <h3 id="name" class="modal-name cap">name</h3>
                <p class="modal-text">email</p>
                <p class="modal-text cap">city</p>
                <hr>
                <p class="modal-text">(555) 555-5555</p>
                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>

        // IMPORTANT: Below is only for exceeds tasks 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
  `;

  // searchContainer.insertAdjacentHTML("beforeend", searchHTML);
  // galleryContainer.insertAdjacentHTML("beforeend", galleryHTML);

  //--- HELPER FUNCTION ---//
  // function checkStatus(response) {
  //   if (response.ok && response.status === 200) {
  //     return Promise.resolve(response);
  //   } else {
  //     return Promise.reject(new Error(response.statusText))
  //   }
  // }

  //--- GALLERY GENERATOR ---//
  function galleryGenerator(employees) {    
    employees.forEach(employee => {
      const galleryHTML = `
        <div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
              <p class="card-text">${employee.email}</p>
              <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
          </div>
        </div>
      `;
      gallery.insertAdjacentHTML("beforeend", galleryHTML);
    });
  }

  //--- MODAL GENERATOR ---//
  function modalGenerator() {}

  //--- REQUEST HANDLER ---//
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      throw error;
    }
  }

  //--- MAKE REQUEST ---//
  try {
    const data = await fetchData("https://randomuser.me/api/?results=12");
    const employees = await data.results;
    galleryGenerator(employees);
    gallery.addEventListener("click", (e) => {      
      if (e.target.className.includes("card")) {
        console.log("click test")
      }
    });
  } catch (error) {
    throw error;
  }
});