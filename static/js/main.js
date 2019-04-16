import {requestPlanetsData, requestResidentDetails, planetsData} from "./requests.js";
import {showModal, showPlanetsTable, showResidentsTable, clearTableBody} from "./view.js";
import {pagination} from "./pagination.js";


requestPlanetsData(showPlanetsTable);
pagination.buttonStatusCheck();

// event bubbling
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('residents')) {  // always true
        clearTableBody("residents-table-content");
        let planetNumber = Number(event.target.dataset.planetId);
        let modal = document.getElementsByClassName("modalContent");
        let urlResidentsList = planetsData[planetNumber].residents;
        requestResidentDetails(urlResidentsList, showResidentsTable);
        showModal(modal, planetNumber);
        
    } else if (event.target.classList.contains('vote')) {
        let planetNumber = Number(event.target.dataset.planetId);
        let voteBtn = event.target.classList.contains('vote');
        voteBtn.setAttribute("disabled", true);
        let planetName = getPlanetNameById(planetNumber);  // napisać, stowrzyć bazę jak się komunikować z nią
        let planetVotes; // wyciągnąć z bazy
        //zwiększyć o 1
        // zapisać do bazy

    } else if (event.target.classList.contains('previous-page-content')) {
        clearTableBody("planets-table-content");
        pagination.showPreviousPage();

    } else if (event.target.classList.contains('next-page-content')) {
        clearTableBody("planets-table-content");
        pagination.showNextPage();
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


