/**
 * "Document" listener runs script once the initial HTML document is loaded.
 * @listens Event "DOMContentLoaded" when HTML completely loads.
**/
document.addEventListener("DOMContentLoaded", async () => {
  //** -- MAIN VARIABLES -- **//
  const data = await fetchData("https://randomuser.me/api/?results=12&nat=us");
  const searchContainer = document.querySelector(".search-container");
  const gallery = document.querySelector(".gallery");

  /**
     * "fetchData" async func sends a single request to the API and grabs information of 12 random "employees".
     * @param {String} url - resource string to fetch the random data.
  **/
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const results = await json.results;

      return results;
    } catch (error) {
      throw error;
    }
  }

  /**
     * "createSearchbox" func creates and inserts a searchbox into the DOM.
  **/
  function createSearchbox() {
    const searchboxHTML = `
      <form action="#" method="get">
          <input type="search" id="search-input" class="search-input" placeholder="Search...">
          <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      </form>
    `;

    searchContainer.insertAdjacentHTML("beforeend", searchboxHTML);
  }

  /**
     * "createCards" func sends a single request to the API and grabs information of 12 random "employees".
     * @param {Array} employees - array of 12 objects with "employees" data.
  **/
  function createCards(employees) {
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

  /**
     * "createModal" func creates and inserts a modal into the DOM.
  **/
  function createModal() {
    const modalHTML = `
      <div class="modal-container">
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
      </div>
    `;

    gallery.insertAdjacentHTML("afterend", modalHTML);
  }

  /**
     * "createInfo" func displays each employee's info within the modal container.
     * @param {Object} employee - Object selected with employee's data.
  **/
  function createInfo(employee) {
    const modalContainer = document.querySelector(".modal-container");
    const infoHTML = `
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">  
            <img id ="modal-image" class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="modal-name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p id="modal-email" class="modal-text">${employee.email}</p>
            <p id="modal-city" class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p id="modal-cell" class="modal-text">${formatPhone(employee.cell)}</p>
            <p id="modal-address" class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state}, ${employee.location.postcode}</p>
            <p id="modal-birthdate" class="modal-text">Birthday: ${formatBirthdate(employee.dob.date)}</p>
          </div>
      </div>
    `;

    /**
     * "formatPhone" func formats each employee's phone number into a (XXX) XXX-XXXX pattern.
     * @param {String} phone - String with the employee's phone number.
    **/
    function formatPhone(phone) {
      const number = phone.match(/\w+/gi).join("");
      const format = number.replace(/^(\w{1,3})(\w{1,3})(\w+)$/gi, `($1) $2-$3`);
      
      return format;
    }

    /**
     * "formatBirthdate" func formats each employee's birth date into a MM/DD/YYYY pattern.
     * @param {dateString} data - dateString with the employee's DOB.
    **/
    function formatBirthdate(data) {
      const date = new Date(data);
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();

      return `${month}/${day}/${year}`;
    }

    modalContainer.insertAdjacentHTML("afterbegin", infoHTML);
  }

  /**
     * "performSearch" func filters by name the results that are already on the page.
  **/
  function performSearch() {
    const searchbox = document.querySelector(".search-input");
    const submit = document.querySelector(".search-submit");
    const form = document.querySelector("form");

    /**
     * "search" func searches among all the results on the page and hides the ones that don't match.
    **/
    function search() {
      const cardsNames = document.querySelectorAll(".card-name");
      let input = searchbox.value.replace(/[^a-zA-Z]/g, "").toLocaleLowerCase();

      cardsNames.forEach(cardName => {
        let name = cardName.textContent.replace(/[^a-zA-Z]/g, "").toLocaleLowerCase();

        (name.includes(input)) ? cardName.parentNode.parentNode.style.display = "flex" : cardName.parentNode.parentNode.style.display = "none";
      });
    }

    searchbox.onkeyup = search;
    submit.onclick = search;
    form.onsubmit = e => e.preventDefault();
  }

  /**
     * "openModals" func opens employee's additional info when clicking on each employee's card.
  **/
  function openModals() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
      card.onclick = () => {
        let cardName = card.querySelector(".card-name").textContent;
        let firstName = data[index].name.first;
        let lastName = data[index].name.last;

        if (cardName.includes(firstName) && cardName.includes(lastName)) {
          createModal();
          createInfo(data[index]);
          toggleModals(cards);
        }
      }
    });
  }

  /**
     * "toggleModals" func toggles back and forth between employees when the modal window is open.
     * @param {NodeList} cards - List of card divs displayed on directory.
  **/
  function toggleModals(cards) {
    const modalContainer = document.querySelector(".modal-container");

    modalContainer.onclick = e => {
      const employees = iterateCards(); // Dynamic array IMPORTANT!
      const modalName = document.querySelector(".modal-name").textContent;
      const modalInfo = document.querySelector(".modal");
      const close = document.querySelector(".modal-close-btn");
      const prev = document.querySelector(".modal-prev");
      const next = document.querySelector(".modal-next");

      /**
      * "iterateCards" func iterates over the remaining cards on gallery after user's search and returns a new array of cards.
      **/
      function iterateCards() {
        const newCards = [];
  
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].style.display !== "none") {
            newCards.push(data[i]);
          }
        }
        return newCards;
      }

      // Conditional close modal when close button (X) is clicked.
      if (close.contains(e.target)) {
        modalContainer.remove();
      }

      employees.forEach((employee, index) => {
        let firstName = employee.name.first;
        let lastName = employee.name.last;

        if (modalName.includes(firstName) && modalName.includes(lastName)) {
          if (prev.contains(e.target)) {
            let prev = index - 1;
  
            if (prev < index && prev >= 0) {
              modalInfo.remove();
              createInfo(employees[prev]);
            }
          }

          if (next.contains(e.target)) {
            let next = index + 1;
  
            if (next > index && next < employees.length) {
              modalInfo.remove();
              createInfo(employees[next]);
            }
          }
        }
      });
    };
  }

  //** -- FUNCTION CALLS -- **//
  createSearchbox();
  createCards(data);
  performSearch();
  openModals();
});