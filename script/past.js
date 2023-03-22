const cardsContainer = document.getElementById("card-template");
const currentDate = setDate(data.currentDate);
const pastEvents = setPastEvents(data.events);
createCards(pastEvents);

function printHTML(container, data) {
    container.innerHTML = data;
}

function setDate(date) {
    const reg = /[-]/g;
    const dateOk = new Date(date.replace(reg, ','));
    return dateOk.getTime();
}

function setPastEvents(arrayDataEvents) {
    let arrayPastEvents = arrayDataEvents.filter(event => setDate(event.date) < currentDate);
    return arrayPastEvents;
}

function createCards(arrayPastEvents) {
    if(arrayPastEvents.length > 0){
        let cardContent = ``;
        arrayPastEvents.forEach(event => {
            cardContent += `
                <div class="col">
                <div class="card h-100">
                    <img src="${event.image}" class="card-img-top" alt="image-${event.image}">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.description}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <div class="card-price">$${event.price}</div>
                        <a href="./details.html?id=${event._id} class="button-info">More Info</a>
                    </div>
                </div>
                </div>`;
        });
        printHTML(cardsContainer, cardContent)
    }else{
        const message = `<h4> No results, try modifying the filters </h4>`;
        printHTML(cardsContainer, message);
    }
}

/*Checkbox Filters*/



const categories = getCategories(data.events);
function getCategories(events) {
    const repeatedCategories = events.map(event => event.category);
    return new Set(repeatedCategories);
}

function removeSpaces (txt) {
    return txt.split(' ').join('-').toLowerCase();
}

const formCheckContainer = document.querySelector(".form-check-container");
createCheckboxFilter(categories);
function createCheckboxFilter(arrayCategories) {
    let fragment = ``;
    arrayCategories.forEach(category => {
        fragment += `<div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="${removeSpaces(category)}" value="${category}">
            <label class="form-check-label" for="${removeSpaces(category)}">${category}</label>
        </div>`
    });
    printHTML(formCheckContainer, fragment);
}

 /*filtros por categoria*/

const checkboxes = document.querySelectorAll(".form-check-input");
let checkedCategories = [];
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", () => {
        if (checkbox.checked === true) {
            checkedCategories.push(checkbox.value);
            checkedCategoryCards(checkedCategories);
        } else {
            checkedCategories = checkedCategories.filter(category => category !== checkbox.value);
            checkedCategoryCards(checkedCategories);
        }
    })
});

let checkedCards = [];
function checkedCategoryCards(checkedCategories) {
    checkedCards = [];
    checkedCategories.forEach(category => {
        const checkedEvents = pastEvents.filter(event => event.category === category);
        checkedEvents.forEach(event => checkedCards.push(event));
    });
    filter(inputSearch.value.toLowerCase(), checkedCards);
}

function filter(value, checkedCards){
    if (checkedCards.length == 0 && value == ""){
        createCards(pastEvents);
    }else if (checkedCards.length == 0 && value !== ""){
        let cards = pastEvents.filter((event) => event.name.toLowerCase().includes(value) || event.description.toLowerCase().includes(value));
        createCards(cards);
    }else{
        let cards = checkedCards.filter((event) => event.name.toLowerCase().includes(value) || event.description.toLowerCase().includes(value));
        createCards(cards.reverse());
    }
}

/*Search Filter*/

const formSearch = document.forms[0];
const inputSearch = document.querySelector(".input-search");
inputSearch.value = '';
inputSearch.addEventListener("keyup", () => {
    const value = inputSearch.value.toLowerCase();
    filter(value, checkedCards);
    
});

formSearch.addEventListener("submit", (e) => e.preventDefault());
