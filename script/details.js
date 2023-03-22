(function(dataEvents) {

  const cardContainer = document.getElementById(".details");
  const currentDate = setDate(data.currentDate);

  function setDate(date) {
      const reg = /[-]/g;
      const dateOk = new Date(date.replace(reg, ','));
      return dateOk.getTime();
  }

  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const card = dataEvents.find((event) => event._id == id);
  
  function assistanceEvent(){
      if (currentDate > setDate(card.date)){
          return `<b>Assistence:</b> ${card.assistance}`;
      }else{
          return `<b>Estimate Assistence:</b> ${card.estimate}`;
     }
  }
   const assistan = assistanceEvent()

  let cardDetails = `
        <div class="img-details">
          <img src="${card.image}" alt="${card.name}">
        </div>
        <div class="text-details">
         <h2 class="text-center">${card.name}</h2>
         <p>Fecha: ${card.date}</p>
         <p>${card.description}</p>
         <p>Category: ${card.category}</p>
         <p>Place: ${card.place}</p>
         <p>Capacity: ${card.capacity}</p>
         <p>Assistance: ${assistan}</p>
         <p>Price:$${card.price}</p>
        </div>
      </div>
    </div>
  </div>`;
    
  cardContainer.innerHTML = cardDetails;
      
})(data.events)

