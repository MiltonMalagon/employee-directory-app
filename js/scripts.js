document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=12&nat=us"); // Response object
    const json = await response.json(); // Object
    const employees = await json.results;
    const searchContainer = document.querySelector(".search-container");
    const gallery = document.querySelector("#gallery");

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
    function modalGenerator(employee, event) {
      const modalHTML = `
        <div class="modal-container">
          <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                  <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                  <p class="modal-text">${employee.email}</p>
                  <p class="modal-text cap">${employee.location.city}</p>
                  <hr>
                  <p class="modal-text">${formatPhone(employee.cell)}</p>
                  <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state}, ${employee.location.postcode}</p>
                  <p class="modal-text">Birthday: ${formatBirthdate(employee.dob.date)}</p>
              </div>
          </div>
          <div class="modal-btn-container">
              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
              <button type="button" id="modal-next" class="modal-next btn">Next</button>
          </div>
        </div>
      `;
      let modal;
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
      gallery.insertAdjacentHTML("afterend", modalHTML);
      
      if (event) {
        modal = document.querySelector(".modal-container");
        modal.querySelector("#modal-close-btn").addEventListener("click", () => {
          modal.remove();
        });
      }
    }

    //--- CALLING GENERATORS ---//
    searchBarGenerator();
    cardsGenerator(employees);

    //--- LISTENERS ---//
    gallery.querySelectorAll(".card").forEach((card, index) => {
      card.addEventListener("click", e => {
        modalGenerator(employees[index], e);
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
// document.addEventListener("DOMContentLoaded", async () => {
//   //--- SEARCH BAR ---//
//   // const searchContainer = document.querySelector(".search-container");
//   //--- GALLERY ---//
//   const body = document.querySelector("body");
//   const gallery = document.querySelector("#gallery");
//   //--- MAKE REQUEST ---//
//   const data = await fetchData("https://randomuser.me/api/?results=12&nat=us");
//   const employees = await data.results;

//   //--- HELPER FUNCTION ---//
//   // function checkStatus(response) {
//   //   if (response.ok && response.status === 200) {
//   //     return Promise.resolve(response);
//   //   } else {
//   //     return Promise.reject(new Error(response.statusText))
//   //   }
//   // }

//   //--- CARDS GENERATOR ---//
//   function cardsGenerator(employees) {    
//     employees.forEach(employee => {
      // const cardHTML = `
      //   <div class="card">
      //     <div class="card-img-container">
      //         <img class="card-img" src="${employee.picture.medium}" alt="${employee.name.first} ${employee.name.last}">
      //     </div>
      //     <div class="card-info-container">
      //         <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
      //         <p class="card-text">${employee.email}</p>
      //         <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
      //     </div>
      //   </div>
      // `;
//       gallery.insertAdjacentHTML("beforeend", cardHTML);
//     });
//     gallery.querySelectorAll(".card").forEach((card, index) => {
//       card.addEventListener("click", () => {
//         modalGenerator(employees[index]);
//       });
//     });
//   }

//   //--- MODAL GENERATOR ---//
//   function modalGenerator(employee) {
//     console.log(employee);
//     function formatPhone(phone) {
//       const number = phone.match(/\w+/gi).join("");
//       const format = number.replace(/^(\w{1,3})(\w{1,3})(\w+)$/gi, `($1) $2-$3`);
      
//       return format;
//     }

//     function formatBirthdate(data) {
//       const date = new Date(data);
//       const month = date.getUTCMonth() + 1;
//       const day = date.getUTCDate();
//       const year = date.getUTCFullYear();

//       return `${month}/${day}/${year}`;
//     }

//     const modalHTML = `
      // <div class="modal-container">
      //   <div class="modal">
      //       <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      //       <div class="modal-info-container">
      //           <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
      //           <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
      //           <p class="modal-text">${employee.email}</p>
      //           <p class="modal-text cap">${employee.location.city}</p>
      //           <hr>
      //           <p class="modal-text">${formatPhone(employee.cell)}</p>
      //           <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state}, ${employee.location.postcode}</p>
      //           <p class="modal-text">Birthday: ${formatBirthdate(employee.dob.date)}</p>
      //       </div>
      //   </div>
      //   <div class="modal-btn-container">
      //       <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      //       <button type="button" id="modal-next" class="modal-next btn">Next</button>
      //   </div>
      // </div>
//     `;
//     gallery.insertAdjacentHTML("afterend", modalHTML);
//     body.addEventListener("click", (e) => {
//       const modal = document.querySelector(".modal-container");
//       const close = document.querySelector(".modal-close-btn");
//       if (close.contains(e.target)) { // contain() method found at https://serversideup.net/detect-if-click-is-inside-an-element-with-javascript/
//         modal.remove();
//       }
//     });
//   }

//   //--- SEARCH BAR GENERATOR ---//
//   function searchBarGenerator() {
//     const searchContainer = document.querySelector(".search-container");

//     const searchHTML = `
//       <form action="#" method="get">
//         <input type="search" id="search-input" class="search-input" placeholder="Search...">
//         <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
//       </form>
//     `;

//     searchContainer.insertAdjacentHTML("beforeend", searchHTML);
//   }

//   //--- REQUEST HANDLER ---//
//   async function fetchData(url) {
//     try {
//       const response = await fetch(url);
//       const json = await response.json();
//       return json;
//     } catch (error) {
//       throw error;
//     }
//   }

//   //--- CREATE CARDS ---//
//   searchBarGenerator();
//   cardsGenerator(employees);
// });