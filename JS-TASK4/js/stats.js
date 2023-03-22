const tbodyUpcoming = document.getElementById("tbody-upcoming");
const tbodypast = document.getElementById("tbody-past");
const tbodyStats = document.getElementById("tbody-stats");
const url = "https://mindhub-xj03.onrender.com/api/amazing";


loadEvents = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const currentDate = setDate(data.currentDate);

        const arrayPastEvents = getPastEvents(data.events, currentDate)
        const arrayUpcomingEvents = getUpcomingEvents(data.events, currentDate);

        const categoriesPastEvents = getCategories(arrayPastEvents);
        const categoriesUpcomingEvents = getCategories(arrayUpcomingEvents);

        const upcomingEventsGrupedByCategories = getEventsGroupedByCategories(arrayUpcomingEvents, categoriesUpcomingEvents);
        const pastEventsGrupedByCategories = getEventsGroupedByCategories(arrayPastEvents, categoriesPastEvents);


        const statisticsEvents = getStatisticsEvents(arrayPastEvents); // data.events
        showStatisticsEvents(statisticsEvents)

        const statisticsUpcomingEvents = getStatistics(upcomingEventsGrupedByCategories);
        const statisticsPastEvents = getStatistics(pastEventsGrupedByCategories);
        showStatistics(statisticsUpcomingEvents, tbodyUpcoming);
        showStatistics(statisticsPastEvents, tbodypast);
    } catch (error) {
        console.log("An error has occurred: " + error.message);
    }
}
loadEvents();

function setDate(date) {
    const reg = /[-]/g;
    const dateOk = new Date(date.replace(reg, ','));
    return dateOk.getTime();
}

function convertToCurrency(value, currency, region = undefined, minDigits = 2) {
    return Intl.NumberFormat(region, { style: "currency", currency: currency, minimumFractionDigits: minDigits }).format(value);
}

const getPastEvents = (dataEvents, currentDate) => dataEvents.filter(event => setDate(event.date) < currentDate);
const getUpcomingEvents = (dataEvents, currentDate) => dataEvents.filter(event => setDate(event.date) > currentDate);
const getCategories = (events) => new Set(events.map(event => event.category));

const getEventsGroupedByCategories = (arrayEvents, arrayCategoriesEvents) => {
    let grupedByCategories = [];
    arrayCategoriesEvents.forEach(category => {
        let eventsByCategories = arrayEvents.filter(event => event.category === category);
        grupedByCategories.push(eventsByCategories)
    })
    return grupedByCategories;
}

const getStatistics = (arrayEvents) => {
    let statistics = []
    arrayEvents.forEach(events => {

        const categorie = new Set(events.map(event => event.category))
        const totalPrices = events.map(event => (event.assistance || event.estimate) * event.price).reduce((a, b) => a + b);
        const percentage = events.map(event => ((event.estimate || event.assistance) * 100) / event.capacity).reduce((a, b) => a + b);

        const stats = {
            categorie: [...categorie].join(''),
            revenues: convertToCurrency(totalPrices, "ARS", "es-AR"),
            percentage: (percentage / events.length).toFixed(2)
        }
        statistics.push(stats);
    })
    return statistics;
}

const showStatistics = (statistics, container) => {
    let register = ``;
    statistics.forEach(statistic => {
        register += `<tr>
        <td>${statistic.categorie}</td>
        <td>${statistic.revenues}</td>
        <td>${statistic.percentage}%</td>
    </tr>`
    })
    container.innerHTML = register;
}

function getStatisticsEvents(events) {
    const newObjEvents = events.map(event => {
        return {
            name: event.name,
            id: event._id,
            percentage: (((event.assistance || event.estimate) * 100) / event.capacity),
        }
    });

    const bigger = newObjEvents.reduce((acc, cur) => { if (acc.percentage < cur.percentage) return cur; else return acc; });
    const biggers = newObjEvents.filter(event => event.percentage == bigger.percentage)
    const minor = newObjEvents.reduce((acc, cur) => { if (acc.percentage > cur.percentage) return cur; else return acc; });
    const minors = newObjEvents.filter(event => event.percentage == minor.percentage)
    const greaterCapacity = events.reduce((acc, cur) => { if (acc.capacity < cur.capacity) return cur; else return acc; });
    const greaterCapacitys = events.filter(event => event.capacity == greaterCapacity.capacity);

    return {
        biggers,
        minors,
        greaterCapacitys
    }
}

const showStatisticsEvents = (datos) => {
    let maxLength = Math.max(...[datos.biggers.length, datos.minors.length, datos.greaterCapacitys.length]);
    let register = ``
    for (let i = 0; i < maxLength; i++) {
        register += `
            <tr>
                <td>${datos.biggers[i] !== undefined ? datos.biggers[i].name + " (" + datos.biggers[i].percentage.toFixed(2) + "%)" : ''} </td>
                <td>${datos.minors[i] !== undefined ? datos.minors[i].name + " (" + datos.minors[i].percentage.toFixed(2) + "%)" : ''}</td>
                <td>${datos.greaterCapacitys[i] !== undefined ? datos.greaterCapacitys[i].name + " (" + Intl.NumberFormat('es-AR').format(datos.greaterCapacitys[i].capacity) + ")" : ''}</td>
            </tr>`
    }
    tbodyStats.innerHTML = register;
}