export {requestPlanetsData}

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

function formatPopulation(population) {
    if (population !== 'unknown') {
        return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' people';
    } else {
        return 'unknown'
    }
}

function formatDiameter(diameter) {
    if (diameter !== 'unknown') {
        return diameter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' km'
    } else {
        return 'unknown'
    }
}

function formatSurfaceWaterPercentage(waterSurface) {
    if (waterSurface !== 'unknown') {
        return waterSurface + '%'
    } else {
        return 'unknown'
    }
}

function requestResidentsDetails(planetId, callback) {
    let xhttp = new XMLHttpRequest();
    xttp.open("GET", `https://swapi.co/planets/${planetId}`, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let planet = JSON.parse(this.responseText);
            let residents
            output = `<table>
                            <tr>
                                <th>name</th>
                                <th>height (in meters)</th>
                                <th>mass (in kg)</th>
                                <th>skin color</th>
                                <th>hair color</th>
                                <th>eye color</th>
                                <th>birth year</th>
                                <th>gender (an icon representation)</th>
                            </tr>

                            <tr>
                                ${planets.map(hobby => `<td>${planet.residents}</td>`).join(" ")}
                            </tr>
                        </table>`;
            document.getElementById("ajax-content").innerHTML = output;
        } else if (this.status === 404) {
            document.getElementById("ajax-content").innerHTML = "Not found";
        }
        xhttp.onerror = function () {
            console.log(this.responseText)
        }
    };
    xhttp.send();
}