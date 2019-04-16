export {showPlanetsTable,
    showModal,
    showResidentsTable,
    clearTableBody,
    toggleButtonState,
}

let planetsData;

// PLANETS TABLE

let showPlanetsTable = function (planets) {
    let output = ``;
    planetsData = planets;
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
            //output += `<button class="btn btn-info residents" data-planet-id = "${i}">${residentsNumber} residents(s)</button>`
            output += `<button id="myModalTrigger" class="btn btn-info residents" type="button" data-toggle="modal" data-target="#myModal" data-planet-id="${i}">${residentsNumber} residents(s)</button>`
        }
        output += `</td><td>
                    <button class="btn btn-info vote"  type="button" data-planet-id="${i}" aria-pressed="true">Vote</button>
                    </td></tr>`
    }
    let tableData = document.getElementById("planets-table-content");
    tableData.insertAdjacentHTML('beforeend', output);
};

// FORMAT PLANETS TABLE

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

// MODAL CONTENT

let showResidentsTable = function (resident) {
    let output = ``;
    output += `<tr><td>${resident.name}</td>
                       <td>${formatHeight(resident.height)}</td>
                       <td>${formatMass(resident.mass)}</td>
                       <td>${resident.hair_color}</td>
                       <td>${resident.skin_color}</td>
                       <td>${resident.eye_color}</td>
                       <td>${resident.birth_year}</td>`;
    if (resident.gender === 'male') {
        output += `<td><i class="fa fa-mars"></i></td></tr>`
        } else {
        output += `<td><i class="fa fa-venus"></i></td></tr>`
        }

    let tableInModal = document.getElementById("residents-table-content");
    tableInModal.insertAdjacentHTML('beforeend', output)
};

let clearTableBody = function (elementId) {
    let table = document.getElementById(elementId);
    console.log(table);
    table.innerHTML = '';
};

function showModal(modal, planetNumber) {
// Show table header
    let modalTitle = planetsData[planetNumber].name;
    document.getElementById("myModalLabel").innerText = modalTitle;

// Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
    modal.onclick = function () {
        modal.style.display = "block";
    };
// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };
// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

// FORMAT DATA IN MODAL'S RESIDENTS TABLE

function formatHeight(height) {
    if (height !== 'unknown') {
        return height.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' meters';
    } else {
        return 'unknown'
    }
}

function formatMass(mass) {
    if (mass !== 'unknown') {
        return mass.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' kg';
    } else {
        return 'unknown'
    }
}

// PAGINATION BUTTONS

function toggleButtonState(className, active) {
    let btn = document.getElementsByClassName(className);
    if (active === true) {
        btn.removeAttribute("disabled");
    } else {
        btn.setAttribute("disabled");
    }

}


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
