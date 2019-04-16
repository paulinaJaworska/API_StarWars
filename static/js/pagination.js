import {nextPageUrl, previousPageUrl, requestPlanetsData} from "./requests.js";
import {showPlanetsTable, toggleButtonState} from "./view.js";
export {pagination};

let pagination = {
    buttonStatusCheck: function (nextPage, previousPage) {
        if (nextPage === null) {
            toggleButtonState("next-page-content", false);
        } else {
            toggleButtonState("next-page-content", true);
        }
        if (previousPage === null) {
            toggleButtonState("previous-page-content", false);
        } else {
            toggleButtonState("previous-page-content", true);
        }
    },
    showPreviousPage: function () {
        let targetPageUrl = previousPageUrl();
        requestPlanetsData(showPlanetsTable, this.buttonStatusCheck, targetPageUrl);
        //this.buttonStatusCheck()
    },
    showNextPage: function () {
        let targetPageUrl = nextPageUrl();
        requestPlanetsData(showPlanetsTable, this.buttonStatusCheck, targetPageUrl);
        //this.buttonStatusCheck()
    }
};