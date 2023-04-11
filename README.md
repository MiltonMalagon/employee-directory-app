# Employee Directory App
## Startup employee directory app
## Techdegree Project 5

### General description
The directory shares contact information of employees provided from an API and uses the response data to display 12 users, along with some basic information for each.

### App sections
This app is developed with eight main functions

#### 1. Fetch function
** *fetchData* **
This function sends a single request to an random user generator API and fetch information of 12 random "employees".

#### 2. Searchbox function
** *createSearchbox* **
This function creates and inserts a user searchbox into the DOM.

#### 3. Cards function
** *createCards* **
This function creates cards with basic info of each employee.

#### 4. Modal function
** *createModal* **
This function creates and inserts a modal into the DOM.

#### 5. Info function
** *createInfo* **
This function displays the selected employee's complete information into the modal.

#### 6. Search function
** *performSearch* **
This function filters by name the results that are already on the page based on user search.

#### 7. Open modal function
** *openModals* **
This function opens a modal when clicking on each employee's card.

#### 8. Open modal function
** *toggleModals* **
This function toggles back and forth between employees when the modal window is open.

### Extra
Custom CSS styles (changes described as /* custom */).

- Font style: Varela Round (applied to the document).
- Background color: #8142BE (applied to background). 
- Animation styles: @keyframes fadeIn (applied to cards).
- Color styles: #340463 (applied to title).
- Box shadow styles: 0px 5px 5px rgba(69, 7, 128, .7) (applied to cards).
