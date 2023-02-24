document.addEventListener("DOMContentLoaded", async () => {
  const search = document.querySelector(".search-container");
  const gallery = document.querySelector("#gallery");
  const employees = await fetchData("https://randomuser.me/api/?results=12&nat=us");

  function createSearchbar() {
    const searchbarHTML = `
      <form action="#" method="get">
          <input type="search" id="search-input" class="search-input" placeholder="Search...">
          <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      </form>
    `;

    search.insertAdjacentHTML("beforeend", searchbarHTML);
  }

  function createCards() {
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

  function createModal() {
    const modalHTML = `
      <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
      </div>
    `;

    gallery.insertAdjacentHTML("afterend", modalHTML);
  }

  function createInfo(index) {
    const modal = document.querySelector(".modal");
    const employee = employees[index];

    const infoHTML = `
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

    modal.insertAdjacentHTML("beforeend", infoHTML);
  }

  function toggleModal(index) {
    const modal = document.querySelector(".modal-container");
    const info = document.querySelector(".modal-info-container");
    const closeButton = document.querySelector("#modal-close-btn");
    const buttonContainer = document.querySelector(".modal-btn-container");

    closeButton.addEventListener("click", () => {
      modal.remove();
    });

    buttonContainer.addEventListener("click", e => {
      if (e.target.id === "modal-prev") {
        let prev = index - 1;
        if (prev < index && prev >= 0) {
          info.remove();
          createInfo(prev); 
        }
      }
      if (e.target.id === "modal-next") {
        let next = index + 1;
        if (next > index && next < employees.length) {
          info.remove();
          createInfo(next); 
        }
      }
    });
  }

  function openModals() {
    const cards = gallery.querySelectorAll(".card");
    
    cards.forEach((card, index) => {
      card.addEventListener("click", (e) => {
        // const newArray = [];

        // for (let i = 0; i < cards.length; i++) {
        //   if (cards[i].style.display !== "none") {
        //     let name = cards[i].querySelector("#name").textContent;
        //     let first = array[i].name.first;
        //     let last = array[i].name.last;

        //     if (name.includes(first) && name.includes(last)) {
        //       newArray.push(array[i]);
        //     }
        //   }
        // }

        createModal();
        createInfo(index);
        toggleModal(index);
      });
    });
  }

  function makeSearch() {
    const searchbox = search.querySelector("#search-input");

    searchbox.addEventListener("keyup", e => {
      const names = gallery.querySelectorAll("#name");
      let value = e.target.value.replace(/[^a-zA-Z]/g, "").toLocaleLowerCase();

      names.forEach(name => {
        let h3 = name.textContent.replace(/[^a-zA-Z]/g, "").toLocaleLowerCase();

        if (h3.includes(value)) {
          name.parentNode.parentNode.style.display = "flex";
        } else {
          name.parentNode.parentNode.style.display = "none";
        }
      });
    });
  } 

  if (employees.length > 0) {
    createSearchbar();
    createCards();
    openModals();
    makeSearch();
  }

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const array = await json.results;

      return array;
    } catch (error) {
      throw error;
    }
  }

  // try {
  //   const response = await fetch("https://randomuser.me/api/?results=12&nat=us"); // Response
  //   const json = await response.json(); // Object
  //   const results = await json.results; // Array
  //   // const employees = [];
  //   console.log(results);

    //--------------------------------------------------------------------------------------------------------

    //--- GENERATOR FUNCTIONS ---//
    // function searchbarGenerator() {
    //   const barHTML = `
    //     <form action="#" method="get">
    //         <input type="search" id="search-input" class="search-input" placeholder="Search...">
    //         <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    //     </form>
    //   `;

    //   search.insertAdjacentHTML("beforeend", barHTML);
    // }
    
    // function cardsGenerator(employees) {
    //   employees.forEach(employee => {
    //     const cardHTML = `
    //       <div class="card">
    //         <div class="card-img-container">
    //             <img class="card-img" src="${employee.picture.medium}" alt="${employee.name.first} ${employee.name.last}">
    //         </div>
    //         <div class="card-info-container">
    //             <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
    //             <p class="card-text">${employee.email}</p>
    //             <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    //         </div>
    //       </div>
    //     `;

    //     gallery.insertAdjacentHTML("beforeend", cardHTML);
    //   });
    // }

    // function cardsEvaluator(employees) {
    //   const cards = gallery.children;
      
    //   Array.from(cards).forEach(card => {
    //     card.addEventListener("click", () => {
    //       for (let i = 0; i < cards.length; i++) {
    //         if (cards[i].style.display !== "none") {
    //           let cardName = cards[i].querySelector("#name").textContent;
    //           let first = employees[i].name.first;
    //           let last = employees[i].name.last;

    //           if (cardName.includes(first) && cardName.includes(last)) {
    //             console.log(employees[i]);
    //           }
    //         }
    //       }
    //     });
    //   });
    // }

    // if (results.length > 0) {
    //   searchbarGenerator();
    //   cardsGenerator(results);
    //   cardsEvaluator(results);
    // }

    // search.querySelector("#search-input").addEventListener("keyup", e => {
    //   const names = gallery.querySelectorAll("#name");
      
    //   names.forEach(name => {
    //     let value = e.target.value.toLowerCase();

    //     if (name.textContent.toLowerCase().includes(value)) {
    //       name.parentNode.parentNode.style.display = "flex";
    //     } else {
    //       name.parentNode.parentNode.style.display = "none";
    //     }
    //   });
    // });

    //----------------------------------------------------------------------------------------------------------------

    //--- GENERATOR FUNCTIONS ---//
    // function searchBarGenerator() {
    //   const barHTML = `
    //     <form action="#" method="get">
    //         <input type="search" id="search-input" class="search-input" placeholder="Search...">
    //         <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    //     </form>
    //   `;

    //   searchContainer.insertAdjacentHTML("beforeend", barHTML);
    // }

    // function cardsGenerator(employees) {
    //   employees.forEach(employee => {
    //     const cardHTML = `
    //       <div class="card">
    //         <div class="card-img-container">
    //             <img class="card-img" src="${employee.picture.medium}" alt="${employee.name.first} ${employee.name.last}">
    //         </div>
    //         <div class="card-info-container">
    //             <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
    //             <p class="card-text">${employee.email}</p>
    //             <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    //         </div>
    //       </div>
    //     `;

    //     gallery.insertAdjacentHTML("beforeend", cardHTML);
    //   });
    // }

    // function modalGenerator(index) {
    //   const modalHTML = `
    //     <div class="modal-container">
    //       <div class="modal">
    //           <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    //           <div class="modal-info-container">
    //           </div>
    //       </div>
    //       <div class="modal-btn-container">
    //           <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    //           <button type="button" id="modal-next" class="modal-next btn">Next</button>
    //       </div>
    //     </div>
    //   `;

    //   gallery.insertAdjacentHTML("afterend", modalHTML);
    //   infoGenerator(index);
    // }

    // function infoGenerator(index) {
    //   const infoContainer = document.querySelector(".modal-info-container");
    //   const employee = employees[index];
    //   const infoHTML = `
    //     <img id ="modal-image" class="modal-img" src="${employee.picture.large}" alt="profile picture">
    //     <h3 id="modal-name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
    //     <p id="modal-email" class="modal-text">${employee.email}</p>
    //     <p id="modal-city" class="modal-text cap">${employee.location.city}</p>
    //     <hr>
    //     <p id="modal-cell" class="modal-text">${formatPhone(employee.cell)}</p>
    //     <p id="modal-address" class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state}, ${employee.location.postcode}</p>
    //     <p id="modal-birthdate" class="modal-text">Birthday: ${formatBirthdate(employee.dob.date)}</p>
    //   `;

    //   function formatPhone(phone) {
    //     const number = phone.match(/\w+/gi).join("");
    //     const format = number.replace(/^(\w{1,3})(\w{1,3})(\w+)$/gi, `($1) $2-$3`);
        
    //     return format;
    //   }

    //   function formatBirthdate(data) {
    //     const date = new Date(data);
    //     const month = date.getUTCMonth() + 1;
    //     const day = date.getUTCDate();
    //     const year = date.getUTCFullYear();
  
    //     return `${month}/${day}/${year}`;
    //   }

    //   infoContainer.insertAdjacentHTML("beforeend", infoHTML);
    //   modalToggler(index);
    // }

    // function modalToggler(index) {
    //   const modal = document.querySelector(".modal-container");
    //   const closeButton = document.querySelector("#modal-close-btn");
    //   const buttonContainer = document.querySelector(".modal-btn-container");

    //   closeButton.addEventListener("click", () => {
    //     modal.remove();
    //   });

    //   buttonContainer.addEventListener("click", e => {
    //     if (e.target.id === "modal-prev") {
    //       let prev = index - 1;
    //       if (prev < index && prev >= 0) {
    //         modal.remove();
    //         modalGenerator(prev); 
    //       }
    //     }
    //     if (e.target.id === "modal-next") {
    //       let next = index + 1;
    //       if (next > index && next < employees.length) {
    //         modal.remove();
    //         modalGenerator(next); 
    //       }
    //     }
    //   });
    // }

    //--- CALLING GENERATORS ---//
    // searchBarGenerator();
    // cardsGenerator(employees);

    //--- LISTENERS ---//
    // gallery.querySelectorAll(".card").forEach((card, index) => {
    //   card.addEventListener("click", () => {
    //     modalGenerator(index);
    //   });
    // });
    // searchContainer.querySelector("#search-input").addEventListener("keyup", (e) => {
    //   const names = document.querySelectorAll("#name");
    //   let value = e.target.value.toLowerCase();

    //   names.forEach(name => {
    //     if (name.textContent.toLowerCase().includes(value)) {
    //       name.parentNode.parentNode.style.display = "flex";
    //     } else {
    //       name.parentNode.parentNode.style.display = "none";
    //     }
    //   });
    // });
//   } catch (error) {
//     throw error;
//   }
});

//--- ADDITIONAL IDEAS ---//
// function searchBarGenerator() {
//   const barHTML = `
//     <form action="#" method="get">
//         <input type="search" id="search-input" class="search-input" placeholder="Search...">
//         <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
//     </form>
//   `;

//   searchContainer.insertAdjacentHTML("beforeend", barHTML);
// }
// function cardsGenerator(employees) {
//   employees.forEach(employee => {
//     const cardHTML = `
//       <div class="card">
//         <div class="card-img-container">
//             <img class="card-img" src="${employee.picture.medium}" alt="${employee.name.first} ${employee.name.last}">
//         </div>
//         <div class="card-info-container">
//             <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
//             <p class="card-text">${employee.email}</p>
//             <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
//         </div>
//       </div>
//     `;

//     gallery.insertAdjacentHTML("beforeend", cardHTML);
//   });
// }

// function countCards() {
//   const cards = gallery.children; //NodeList
//   console.log(cards);
//   for (let i = 0; i < cards.length; i++) {
//     console.log(cards[i]);
//   }
// }
// searchBarGenerator();
// cardsGenerator(results);
// countCards();
// searchContainer.querySelector("#search-input").addEventListener("keyup", (e) => {
//   const names = document.querySelectorAll("#name");
//   let value = e.target.value.toLowerCase();

//   names.forEach(name => {
//     if (name.textContent.toLowerCase().includes(value)) {
//       name.parentNode.parentNode.style.display = "flex";
//     } else {
//       name.parentNode.parentNode.style.display = "none";
//     }
//   });
// });