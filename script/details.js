(function(dataEvents) {

  const cardContainer = document.getElementById("details");
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
    
      cardContainer.innerHTML = templateCard;
      
      const btnback = document.getElementById('btn-back');
      btnback.addEventListener('click', () => history.back())
      
})(data.events)