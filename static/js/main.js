import {requestPlanetsData, requestResidentsUrls, requestResidentDetails} from "./requests.js";
import {showModal, showPlanetsTable, showResidentsTable} from "./view.js";

export {planetNumber}

requestPlanetsData(showPlanetsTable);
let planetNumber;

// event bubbling
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('residents')) {  // always true
        const firstPlanet = 1;
        planetNumber = Number(event.target.dataset.planetId) + firstPlanet;
        requestResidentsUrls(planetNumber, requestResidentDetails);
        showModal();
    }
}, false);


/*
let residentsDetailsButtons = document.getElementsByClassName("residents");

    for (let residentsButton in residentsDetailsButtons) {
        residentsButton.addEventListener('click', function () {console.log("clicked")});
    }
*/

/*residentsDetailsButtons.prototype.forEach(residentsButton => residentsButton.addEventListener('click',
    function () {console.log("clicked")}));*/
/*requestResidents(planetNumber, showModal(planetNUmber))));
*/


