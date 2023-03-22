const cardsContainer = document.getElementById("card-template");
const url = "https://mindhub-xj03.onrender.com/api/amazing";


let dataEvents = null;
loadEvents = async () => {
    try {
        preload()
        const response = await fetch(url);
        const { events } = await response.json();

        createCards(events);
        dataEvents = events;

        const categories = getCategories(events);
        createCheckboxFilter(categories);

        const checkboxes = document.querySelectorAll(".form-check-input");
        checkboxEvent(checkboxes);
    } catch (error) {
        console.log("An error has occurred: " + error.message);
    }
}
loadEvents()

function preload() {
    const template = document.querySelector("#template-preload").content;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 8; i++) {
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    }
    cardsContainer.appendChild(fragment);
}


function printHTML(container, data) {
    container.innerHTML = data;
}

function createCards(arrayDataEvents) {
    if (arrayDataEvents.length > 0) {
        let cardContent = ``;
        arrayDataEvents.forEach(event => {
            cardContent += `
                <div class="col">
                <div class="card h-100">
                    <img src="${event.image}" class="card-img-top" alt="image-${event.image}" loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.description}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <div class="card-price">$${event.price}</div>
                        <a class="card-info" href="./details.html?id=${event._id}">More Info</a>
                    </div>
                </div>
                </div>`;
        });
        printHTML(cardsContainer, cardContent)
    } else {
        const message = `<h4> No results, try modifying the filters </h4>`;
        printHTML(cardsContainer, message);
    }
}



function getCategories(events) {
    const repeatedCategories = events.map(event => event.category);
    return new Set(repeatedCategories);
}

function removeSpaces(txt) {
    return txt.split(' ').join('-').toLowerCase();
}

const formCheckContainer = document.querySelector(".form-check-container");
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

let checkedCategories = [];
function checkboxEvent(checkboxes) {
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
}

let checkedCards = [];
function checkedCategoryCards(checkedCategories) {
    checkedCards = [];
    checkedCategories.forEach(category => {
        const checkedEvents = dataEvents.filter(event => event.category === category);
        checkedCards.push(checkedEvents);
    });
    filter(inputSearch.value.toLowerCase(), checkedCards.flat());
}

function filter(value, checkedCards) {
    if (checkedCards.length == 0 && value == "") {
        createCards(dataEvents);
    } else if (checkedCards.length == 0 && value !== "") {
        let cards = dataEvents.filter((event) => event.name.toLowerCase().includes(value) || event.description.toLowerCase().includes(value));
        createCards(cards);
    } else {
        let cards = checkedCards.filter((event) => event.name.toLowerCase().includes(value) || event.description.toLowerCase().includes(value));
        createCards(cards.reverse());
    }
}



const formSearch = document.forms[0];
const inputSearch = document.querySelector(".input-search");
inputSearch.value = '';

inputSearch.addEventListener("keyup", () => {
    const value = inputSearch.value.toLowerCase();
    filter(value, checkedCards.flat());
});

formSearch.addEventListener("submit", (e) => e.preventDefault());