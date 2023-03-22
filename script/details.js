let params = new URLSearchParams(document.location.search)
let id = params.get("id")
console.log(id);



const evento = data.events.filter(evento => evento._id == id);
console.log(evento);


const container = document.getElementById("details");
let cards = '';
  console.log(evento[0].name);  
      cards += `
       <div class="img-details">
         <img src="${evento[0].image}" alt="${evento[0].name}">
       </div>
       <div class="text-details">
         <h2 class="text-center">${evento[0].name}</h2>
         <p>Fecha: ${evento[0].date}</p>
         <p>${evento[0].description}</p>
         <p>Category: ${evento[0].category}</p>
         <p>Place: ${evento[0].place}</p>
         <p>Capacity: ${evento[0].capacity}</p>
         <p>Assistance: ${evento[0].assistance}</p>
         <p>Price: ${evento[0].price}</p>
       </div>`;
    
        container.innerHTML = cards