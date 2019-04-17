import {requestPlanetsData, requestResidentDetails, planetsData} from "./requests.js";
import {showResidentsModal, showPlanetsTable, showResidentsTable, clearElementContent,
    showVotingTable, showStatsModal, handleNavigationBar} from "./view.js";
import {pagination} from "./pagination.js";


requestPlanetsData(showPlanetsTable, pagination.buttonStatusCheck);

// event bubbling
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('residents')) {  // always true
        clearElementContent("residents-table-content");
        let planetNumber = Number(event.target.dataset.planetId);
        let modal = document.getElementsByClassName("modalContent");
        let urlResidentsList = planetsData[planetNumber].residents;
        requestResidentDetails(urlResidentsList, showResidentsTable);
        showResidentsModal(modal, planetNumber);
        
    } else if (event.target.classList.contains('vote')) {
        let planetNumber = Number(event.target.dataset.planetId);
        let voteBtn = event.target.classList.contains('vote');
        voteBtn.setAttribute("disabled", true);
        let planetName = getPlanetNameById(planetNumber);
        let planetVotes; // get from database
        // handle planetVotes

    } else if (event.target.classList.contains('previous-page-content')) {
        clearElementContent("planets-table-content");
        pagination.showPreviousPage();

    } else if (event.target.classList.contains('next-page-content')) {
        clearElementContent("planets-table-content");
        pagination.showNextPage();
    } else if (event.target.classList.contains("voting-stats-btn")) {
        clearElementContent("votes-table-content");
        showStatsModal();
        showVotingTable(); // wywołanie przez request
    } else if (event.target.classList.contains("registration-btn")) {
    } else if (event.target.classList.contains("login-btn")) {
    } else if (event.target.classList.contains("logout-btn")) {
    }
}, false);

