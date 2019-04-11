export {showTable}

let showTable = function (planets) {
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
            output += `<button class="btn btn-info planet${i}">${residentsNumber} residents(s)</button>`
        }
        output += `</td>`
    }
    let tableData = document.getElementById("planets");
    tableData.insertAdjacentHTML('beforeend', output);
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

/*Instead I would create the <button> directly with createElement() and then add it to DOM
with appendChild(), or I would use a DocumentFragment or a <template> in order to avoid querySelector()
on all of the blogDiv.*/

/*residentsDetailsButton = document.getElementsByClassName("residents");
residentsDetailsButton.addEventListener('click', showModal())

let modal = document.getElementById('residentsModal');

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


/* '<tr><th>Name</th><th>Diameter</th><th>Climate</th><th>Terrain</th><th>Surface Water Percentage</th><th>Population</th><th>Residents</th></tr>';
            for (let i in planets) {
                output += '<tr><td>' + planets[i].name +
                    '</td><td>' + formatDiamter(planets[i].diameter) +
                    '</td><td>' + planets[i].climate + '</td><td>' +
                    planets[i].terrain + '</td><td>' +
                    formatSurfaceWaterPercentage(planets[i].surface_water) + '</td class="population"><td>' +
                    formatPopulation(planets[i].population) +
                    '</td><td>';
                if (planets[i].residents.length === 0) {
                    output += 'No known residents'
                } else {
                    let residentsNumber = String(planets[i].residents.length);
                    output += `<button id="btn-residents" class="btn btn-info">${residentsNumber} residents(s)</button>`
                }
                output += '</td>'
            } */