import {showResidentsTable} from "./view.js";

export {
    requestPlanetsData,
    requestResidentsUrls,
    requestResidentDetails
}


let requestPlanetsData = function (callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://swapi.co/api/planets/", true);
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText);
            let planets = data.results;
            callback(planets);

        } else if (this.status === 404) {
            document.getElementById("planets").innerHTML = "Not found";
        }
    };
    xhttp.send();
};


let requestResidentsUrls = function (planetId, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `https://swapi.co/api/planets/${Number(planetId)}`, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let planetData = JSON.parse(this.responseText);
            let residentsUrlList = planetData['residents'];
            //let output = `<tbody>`;
            for (let urlItem of residentsUrlList) {
                callback(urlItem, showResidentsTable)  // model connects directly to view
            }
        } else if (this.status === 404) {
            document.getElementById("modal-content").innerHTML = "Not found";
        }
    };
    xhttp.send();
};


function requestResidentDetails(requesUrl, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${requesUrl}`, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let resident = JSON.parse(this.responseText);
            callback(resident);
        } else if (this.status === 404) {
            document.getElementById("table-content").innerHTML = "Not found"
        }
    };
    xhttp.send();

}

