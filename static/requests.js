planets = document.getElementById("planets");
planets.addEventListener('onload', requestPlanetsData);


function requestPlanetsData () {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://swapi.co/api/planets/", true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText);
            let planets = data.results;
            let output = ``;

            for (let i in planets) {
                output += `<tr><td>${planets[i].name}</td>
                            <td>${formatDiameter(planets[i].diameter)}</td>
                            <td>${planets[i].climate}</td>
                            <td>${planets[i].terrain}</td>
                            <td>${formatSurfaceWaterPercentage(planets[i].surface_water)}</td>
                            <td>${formatPopulation(planets[i].population)}</td>
                            <td>`;

                if (planets[i].residents.length === 0) {
                    output += `No known residents`
                } else {
                    let residentsNumber = String(planets[i].residents.length);
                    output += `<button id="btn-residents" class="btn btn-info">${residentsNumber} residents(s)</button>`
                }

                output += `</td>`
            }


        /*    output += `<div id="residentsModal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>`
*/

                /*
                '<tr><th>name</th><th>diameter (in km)</th><th>climate</th><th>terrain</th><th>surface water (in percentage)</th><th>population in formatted way</th><th>if the planet has residents</th></tr>';
            for (let i in planets) {
                output += '<tr><td>' + planets[i].name + '</td><td>' + planets[i].diameter + '</td><td>' + planets[i].climate + '</td><td>' + planets[i].terrain + '</td><td>' + planets[i].surface_water + '</td><td>' + planets[i].population + '</td><td id="residents">' + planets[i].residents + '</td>'
            }*/

            /*`<tr><th>name</th><th>diameter (in km)</th><th>climate</th><th>terrain</th><th>surface water (in percentage)</th><th>population in formatted way</th><th>if the planet has residents</th></tr>`;
            for (let i in planets) {
                output += `<tr><td>${planets[i].name}</td><td>${planets[i].diameter}</td><td>${planets[i].climate}</td><td>${planets[i].terrain}</td><td>${planets[i].surface_water}</td><td>${planets[i].population}</td><td id="residents">${planets[i].residents}</td>`
            }*/

           /*
            <!--<td>
                <button id="btn-details" class="btn">Details</button>

            </td>-->
        </tr>`;*/
            tableData = document.getElementById("planets");
            tableData.insertAdjacentHTML('beforeend', output);
            //document.getElementById("planets").innerHTML = planets;
        } else if (this.status === 404) {
            document.getElementById("planets").innerHTML = "Not found";
        }
/*        xhttp.onerror = function() {
            console.log(this.responseText)
        }*/
    };
    xhttp.send();
}

requestPlanetsData();
/*

detailsButton = document.getElementById("btn-details");
detailsButton.addEventListener('click', showResidentsDetails);
*/

/*function requestResidentsDetails() {
    // 1. create a new XMLHttpRequest object -- an object like any other!
    let xhttp = new XMLHttpRequest();
    // 2. open the request and pass the HTTP method name and the resource as parameters
    // true is for async
    xttp.open("GET", "https://swapi.co/planets", true);
    // 3. write a function that runs anytime the state of the AJAX request changes
    xhttp.onreadystatechange = function () {
        // 4. check if the request has a readyState of 4, which indicates the server has responded (complete)
        if (this.readyState === 4 && this.status === 200) {
            // 5. insert the text sent by the server into the HTML of the 'ajax-content'
            let planets = JSON.parse(this.responseText);
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
    xhttp.onerror = function() {
        console.log(this.responseText)
    }
    };
    xhttp.send();
}*/

/*
${planets.map(planet => `<td>${planet.name}</td>`).join(" ")}<tr>
${planets.map(planet => `<td>${planet.name}</td>`).join(" ")}
        */

/*
residentsCell = document.getElementById("residents");

if (residentsCell === []) {
    residentsCell.innerText = "No known residents"
} else {
    residentsCell.innerText = '<button id="btn-details" class="btn">Details</button>' +
        '<div>' +
        '<div id="myModal" class="modal" >' +
        '<div class="modal-content" id="ajax-content">' +
        '<span class="close">&times;</span>' +
        '</div>' +
        '</div>' +
        '</div>'
}*/



/* Zrobić uniwersalną templatkę do każdej strony
const student = {
    name: "Ryan Christiani",
    blogUrl: "http://ryanchristiani.com"
}

const studentTemplate = templater`<article>
    <h3>${'name'} is a student at HackerYou</h3>
    <p>You can find their work at ${'blogUrl'}.</p>

</article>`;

const myTemplate = studentTemplate(student);*/




/*let modal = document.getElementById('residentsModal');

// Get the button that opens the modal
let btn = document.getElementById("btnResidents");
btn.addEventListener('click', showModal);

function showModal () {
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    };

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}*/
