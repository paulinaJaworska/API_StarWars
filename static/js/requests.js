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
                callback(urlItem)
            }
        } else if (this.status === 404) {
            document.getElementById("modal-content").innerHTML = "Not found";
        }
    };
    xhttp.send();
};


function requestResidentDetails(requesUrl) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${requesUrl}`, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let person = JSON.parse(this.responseText);
            let output = `<tr>`;
            output += `<td>${person.name}</td>
                       <td>${person.height}</td>
                       <td>${person.mass}</td>
                       <td>${person.hair_color}</td>
                       <td>${person.skin_color}</td>
                       <td>${person.eye_color}</td>
                       <td>${person.birth_year}</td>
                       <td>${person.gender}</td></tr>`;
            let tableInModal = document.getElementById("table-content")
            tableInModal.insertAdjacentHTML('beforeend', output)
        } else if (this.status === 404) {
            document.getElementById("table-content").innerHTML = "Not found"
        }
    };
    xhttp.send();

}

