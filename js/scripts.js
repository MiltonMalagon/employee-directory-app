document.addEventListener("DOMContentLoaded", async () => {
  const searchContainer = document.querySelector(".search-container");
  const gallery = document.querySelector("#gallery");

  try {
    const response = await fetch("https://randomuser.me/api/?results=12&nat=us"); // Response object
    const json = await response.json(); // Object
    const employees = await json.results;

    //--- GENERATOR FUNCTIONS ---//
    function searchBarGenerator() {
      const barHTML = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
      `;

      searchContainer.insertAdjacentHTML("beforeend", barHTML);
    }

    function cardsGenerator(employees) {
      employees.forEach(employee => {
        const cardHTML = `
          <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.medium}" alt="${employee.name.first} ${employee.name.last}">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
          </div>
        `;

        gallery.insertAdjacentHTML("beforeend", cardHTML);
      });
    }

    function modalGenerator(index) {
      const modalHTML = `
        <div class="modal-container">
          <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
              </div>
          </div>
          <div class="modal-btn-container">
              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
              <button type="button" id="modal-next" class="modal-next btn">Next</button>
          </div>
        </div>
      `;

      gallery.insertAdjacentHTML("afterend", modalHTML);
      infoGenerator(index);
    }

    function infoGenerator(index) {
      const infoContainer = document.querySelector(".modal-info-container");
      const employee = employees[index];
      const infoHTML = `
        <img id ="modal-image" class="modal-img" src="${employee.picture.large}" alt="profile picture">
        <h3 id="modal-name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p id="modal-email" class="modal-text">${employee.email}</p>
        <p id="modal-city" class="modal-text cap">${employee.location.city}</p>
        <hr>
        <p id="modal-cell" class="modal-text">${formatPhone(employee.cell)}</p>
        <p id="modal-address" class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state}, ${employee.location.postcode}</p>
        <p id="modal-birthdate" class="modal-text">Birthday: ${formatBirthdate(employee.dob.date)}</p>
      `;

      function formatPhone(phone) {
        const number = phone.match(/\w+/gi).join("");
        const format = number.replace(/^(\w{1,3})(\w{1,3})(\w+)$/gi, `($1) $2-$3`);
        
        return format;
      }

      function formatBirthdate(data) {
        const date = new Date(data);
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
  
        return `${month}/${day}/${year}`;
      }

      infoContainer.insertAdjacentHTML("beforeend", infoHTML);
      modalToggler(index);
    }

    function modalToggler(index) {
      const modal = document.querySelector(".modal-container");
      const closeButton = document.querySelector("#modal-close-btn");
      const buttonContainer = document.querySelector(".modal-btn-container");

      closeButton.addEventListener("click", () => {
        modal.remove();
      });

      buttonContainer.addEventListener("click", e => {
        if (e.target.id === "modal-prev") {
          let prev = index - 1;
          if (prev < index && prev >= 0) {
            modal.remove();
            modalGenerator(prev); 
          }
        }
        if (e.target.id === "modal-next") {
          let next = index + 1;
          if (next > index && next < employees.length) {
            modal.remove();
            modalGenerator(next); 
          }
        }
      });
    }

    //--- CALLING GENERATORS ---//
    searchBarGenerator();
    cardsGenerator(employees);

    //--- LISTENERS ---//
    gallery.querySelectorAll(".card").forEach((card, index) => {
      card.addEventListener("click", () => {
        modalGenerator(index);
      });
    });
    searchContainer.querySelector("#search-input").addEventListener("keyup", (e) => {
      const names = document.querySelectorAll("#name");
      let value = e.target.value.toLowerCase();

      names.forEach(name => {
        if (name.textContent.toLowerCase().includes(value)) {
          name.parentNode.parentNode.style.display = "flex";
        } else {
          name.parentNode.parentNode.style.display = "none";
        }
      });
    });
  } catch (error) {
    throw error;
  }
});