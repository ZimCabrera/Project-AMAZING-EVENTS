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
  
  function assistenceEvent(){
      if (currentDate > setDate(card.date)){
          return `<b>Assistence:</b> ${card.assistance}`;
      }else{
          return `<b>Estimate Assistence:</b> ${card.estimate}`;
     }
  }
  const assistence = assistenceEvent()

  let templateCard = `
       <div class="img-details">
         <img src="${evento.image}" alt="${evento.name}">
       </div>
       <div class="text-details">
         <h2 class="text-center">${evento.name}</h2>
         <p>Fecha: ${evento.date}</p>
         <p>${evento.description}</p>
         <p>Category: ${evento.category}</p>
         <p>Place: ${evento.place}</p>
         <p>Capacity: ${evento.capacity}</p>
         <p>Assistance: ${evento.assistance}</p>
         <p>Price: ${evento.price}</p>
       </div>`;
    
      cardContainer.innerHTML = templateCard;
      
      const btnback = document.getElementById('btn-back');
      btnback.addEventListener('click', () => history.back())
      
})(data.events)