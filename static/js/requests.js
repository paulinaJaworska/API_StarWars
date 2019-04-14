export {
    requestPlanetsData,
    requestResidentDetails,
    planetsData
}
// variable to store data about the planets and url list for residents later
let planetsData;

let requestPlanetsData = function (callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://swapi.co/api/planets/", true);
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText);
            let planets = data.results;
            callback(planets);

            planetsData = planets;
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

