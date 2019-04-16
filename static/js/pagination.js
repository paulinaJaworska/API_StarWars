import {nextPageUrl, previousPageUrl, requestPlanetsData} from "./requests.js";
import {showPlanetsTable, toggleButtonState} from "./view.js";
export {pagination};

let pagination = {
    buttonStatusCheck: function () {
        if (nextPageUrl === null) {
            toggleButtonState("next-page-content", false);
        } else if (previousPageUrl === null){
            toggleButtonState("previous-page-content", false);
        } else if (nextPageUrl ==! null){
            toggleButtonState("next-page-content", true);
        } else if (previousPageUrl ==! null) {
            toggleButtonState("previous-page-content", true);
        }
    },
    showPreviousPage: function () {
        let targetPageUrl = previousPageUrl();
        requestPlanetsData(showPlanetsTable, targetPageUrl);
        this.buttonStatusCheck()
    },
    showNextPage: function () {
        let targetPageUrl = nextPageUrl();
        requestPlanetsData(showPlanetsTable, targetPageUrl);
        this.buttonStatusCheck()
    },
};