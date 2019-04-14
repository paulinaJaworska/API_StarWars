import {requestPlanetsData, requestResidentDetails, planetsData} from "./requests.js";
import {showModal, showPlanetsTable, showResidentsTable, clearTableBody} from "./view.js";

export {planetNumber}

requestPlanetsData(showPlanetsTable);
let planetNumber;

// event bubbling
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('residents')) {  // always true
        clearTableBody();
        planetNumber = Number(event.target.dataset.planetId);
        let modal = document.getElementsByClassName("modalContent");
        let urlResidentsList = planetsData[planetNumber].residents;
        requestResidentDetails(urlResidentsList, showResidentsTable);
        showModal(modal);
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


