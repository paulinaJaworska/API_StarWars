export {requestPlanetsData,
    requestResidentDetails,
    planetsData,
    nextPageUrl,
    previousPageUrl}
// variable to store data about the planets and url list for residents later
let planetsData;
let planetsDataWithDetails;
//let data = requestPlanetsData();
//console.log(data);

let requestPlanetsData = function (callback, urlCallback, urlPage="https://swapi.co/api/planets/") {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlPage , true);
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText);

            // pagination
            urlCallback(data.next, data.previous);
            planetsDataWithDetails = data;

            // displaying requested data
            let planets = data.results;
            callback(planets);
            planetsData = planets;
            return data
        } else if (this.status === 404) {
            document.getElementById("planets").innerHTML = "Not found";
        }
    };
    xhttp.send();
};


function requestResidentDetails(requestUrls, callback) {
    for (let urlItem of requestUrls) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", `${urlItem}`, true);
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
}

let nextPageUrl = function () {
    return planetsDataWithDetails.next
};

let previousPageUrl = function () {
    return planetsDataWithDetails.previous
};
