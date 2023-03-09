const card = document.getElementById("card-template");


data.events.map((event) =>{
  card.innerHTML += `
    <div class="col">
      <div class="card h-100" data-category="${event.category}">
        <img src="${event.image}" class="card-img" alt="${event.name}">
        <div class="card-body">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text">${event.description}</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <div class="card-price">$${event.price}</div>
          <a class="btn btn-danger card-moreInfo" role="button"  href="./details.html" target="_blank">More Info+</a>
        </div>
      </div>
    </div>
  `;
});
