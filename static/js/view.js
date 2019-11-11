import {postDataModern} from "./api_ajax.js";


export {showPlanetsTable,
    showResidentsModal,
    showResidentsTable,
    clearElementContent,
    toggleButtonState,
    showVotingTable,
    showStatsModal,
    //handleNavigationBar
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
            output += `<button id="myModalTrigger" class="btn btn-info residents-btn cell${i}" type="button" data-toggle="modal" data-target="#myModal" data-planet-id="${i}">${residentsNumber} residents(s)</button>`
        }
        output += `</td><td>
                    <button class="btn btn-info vote"  type="button" data-planet-name = "${planets[i].name}" data-planet-id="${i}" aria-pressed="true" disabled>Vote</button>
                    </td> 
                    <td data-planet-id="${i}"><button type="button" class="btn btn-info statusBtn">${status}</button></td></tr>`
        /*output += `</tr>`*/
    }
    let tableData = document.getElementById("planets-table-content");
    tableData.insertAdjacentHTML('beforeend', output);
};

let statusButtonCollection = document.getElementsByClassName("statusBtn");
for (let btn of statusButtonCollection) {
    btn.addEventListener('click', changeStatus(btn))
}


function changeStatus(btn) {
/*    if (btn.textContent === 'no'){
        btn.textContent = 'yes';
    } else {
        btn.textContent = 'no';
    }*/

    let jsonEpisodeData = {
        'planet_name': btn.dataset.planetId,
    };
    postData('/update_status', jsonEpisodeData, changeDisplayedStatus(btn));
}

function postData(url, data, showNewData) {
    fetch(link, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json_response => callback(json_response))
        .catch(error => console.log(error))
}

function changeDisplayedStatus(data) {

}

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

// CLEAR CONTENT
let clearElementContent = function (elementId) {
    let table = document.getElementById(elementId);
    table.innerHTML = '';
};


// RESIDENTS MODAL
let showResidentsTable = function (resident) { // validacja struktury danych
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

    let tableInModal = document.getElementById("residents-table-content"); // 2 podejścia na początku lub przed samym użyciem
    tableInModal.insertAdjacentHTML('beforeend', output)
};

function showResidentsModal(modal, planetNumber) {
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
// dodać info o stronach
function toggleButtonState(className, active) {
    let btn = document.getElementsByClassName(className);
    let firstElementOfCollection = 0;
    if (active === true) {
        btn[firstElementOfCollection].removeAttribute("disabled");
    } else {
        btn[firstElementOfCollection].setAttribute("disabled", "");
    }
}

// VOTING STATS MODAL

let showVotingTable = function () {
    let output = ``;
    output += `<tr><td>name</td>
              <td>vote</td></tr>`;
    let tableBody = document.getElementById("votes-table-content");
    tableBody.insertAdjacentHTML('beforeend', output)
};

function showStatsModal() {
    let modal = document.getElementsByClassName("modal");

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

// SHOW REGISTER/LOGIN MODAL

function showRegisterModal() {
    let modal = document.getElementsByClassName("modal");

// Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0]; // użyj id

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

function showLoginModal() {
    let modal = document.getElementsByClassName("modal");

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

// NAV BAR


import {createLoginNav, createRegistrationNav, createLogoutNav, createLoginInfo} from "./dom_handler.js";


export {displayNavigationBar, setNavBarForLogged, setNavBarForNotLogged}



function setNavBarForNotLogged() {
    const menu = document.getElementById('nav-bar');
    let loginNav = createLoginNav();
    let registrationNav = createRegistrationNav();
    let logoutElement = document.getElementById('logout-nav');
    let infoElement = document.getElementById('login-info-nav');

    if (menu.contains(logoutElement) && menu.contains(infoElement)) {
        menu.replaceChild(loginNav, logoutElement);
        menu.replaceChild(registrationNav, infoElement);
    } else {
        menu.appendChild(loginNav);
        menu.appendChild(registrationNav);
    }
}

function setNavBarForLogged(username) {
    const menu = document.getElementById('nav-bar');
    let logoutNav = createLogoutNav();
    let loginInfoNav = createLoginInfo(username);
    let loginElement = document.getElementById('login-nav');
    let registerElement = document.getElementById('registration-nav');

    if (menu.contains(loginElement) && menu.contains(registerElement)) {
        menu.replaceChild(logoutNav, loginElement);
        menu.replaceChild(loginInfoNav, registerElement);
    } else {
        menu.appendChild(logoutNav);
        menu.appendChild(loginInfoNav);
    }
}

// when page loaded - check if user is logged(is there a cookie with his username) and show nav bar adequately
function displayNavigationBar() {
    let username = localStorage.getItem('username');
    if (username) {
        setNavBarForLogged(username)
    } else {
        setNavBarForNotLogged()
    }
}

//////////////////////////////////////////////////////////////////////////////

// /*
// import {logOut, logIn, registration} from "./user.js";
//
// export {clearElement, removeHtmlString, showSpinner}
// export {createLoginInfo, createLogoutNav, createRegistrationNav, createLoginNav}
// export {displayErrorMessage, displaySuccessMessage}
//
// export {openModal, clearModal, closeModal}
//
//
// // clear functions
// function clearElement(selector) {
//     const element = document.querySelector(selector);
//
//     while (element.firstChild) {
//         element.removeChild(element.firstChild)
//     }
// }
//
// function removeHtmlString(element) {
//     if (element) {
//         element.innerHTML = "";
//     }
// }
//
// // creates elements of navigation bar
//
// function createLogoutNav() {
//     let logoutNav = document.createElement('li');
//     logoutNav.classList.add('nav-item', 'hvr-underline-from-center');
//     logoutNav.setAttribute('id', 'logout-nav');
//
//     let a = document.createElement('a');
//     a.classList.add('nav-link');
//     a.setAttribute('href', "/logout");
//     a.textContent = 'Logout';
//     logoutNav.appendChild(a);
//
//     logoutNav.addEventListener('click', logOut);
//
//     return logoutNav
//
// }
//
// function createLoginNav() {
//     let loginNav = document.createElement('li');
//     loginNav.classList.add('nav-item', 'hvr-underline-from-center');
//     loginNav.setAttribute('id', 'login-nav');
//
//     let a = document.createElement('a');
//     a.classList.add('nav-link');
//     a.setAttribute('data-toggle', 'modal');
//     a.setAttribute('data-target', '#loginModal');
//     a.textContent = 'Login';
//
//     loginNav.appendChild(a);
//     loginNav.addEventListener('click', logIn);
//
//     return loginNav
// }
//
// function createRegistrationNav() {
//     let registrationNav = document.createElement('li');
//     registrationNav.classList.add('nav-item', 'hvr-underline-from-center');
//     registrationNav.setAttribute('id', 'registration-nav');
//
//     let a = document.createElement('a');
//     a.classList.add('nav-link');
//     a.setAttribute('data-toggle', 'modal');
//     a.setAttribute('data-target', '#registerModal');
//     a.textContent = 'Registration';
//
//     registrationNav.appendChild(a);
//
//     registrationNav.addEventListener('click', registration);
//
//     return registrationNav
//
// }
//
// function createLoginInfo(username) {
//     let loginInfoNav = document.createElement('li');
//     loginInfoNav.classList.add('nav-item');
//     loginInfoNav.setAttribute('id', 'login-info-nav');
//
//     let span = document.createElement('span');
//     span.classList.add('navbar-text');
//     span.textContent = 'Logged as ' + username;
//
//     loginInfoNav.appendChild(span);
//
//     return loginInfoNav
// }
//
// function showSpinner(element) {
//     const spinner = document.createRange().createContextualFragment`
//     <div class="spinner-border text-primary" role="status">
//         <span class="sr-only">Loading...</span>
//     </div>`;
//     if (element && element.firstChild === null) {
//         element.appendChild(spinner)
//     }
// }
//
//
// // display messages about success/loginFail (login/registration)
// function displayErrorMessage(fail, success, message) {
//
//     fail.style.display = 'block';
//     fail.textContent = message;
//
//     success.style.display = 'none';
//
// }
//
// function displaySuccessMessage(fail, success, message) {
//
//     success.style.display = 'block';
//     success.textContent = message;
//
//     fail.style.display = 'none';
//
// }
//
// // --- small modal---
//
// function createSmallModal(username, message) {
//     let modalContainer = document.getElementById('small-modal');
//     let modal = `
//     <div class="info-modal-body">
//         <div class="info-modal-title">
//             <button class="info-modal-close" id="close-small-modal"><span>&times;</span></button>
//             <span>Hello <strong>${username}</strong></span>
//         </div>
//         <div class="info-modal-message">
//             <span>${message}</span>
//         </div>
//     </div>
//     `;
//     modalContainer.insertAdjacentHTML("afterbegin", modal)
// }
//
// function openModal(username, message) {
//     createSmallModal(username, message);
//     let modal = document.getElementById('small-modal');
//     modal.classList.replace('hidden', 'visible');
//     addHidingModal();
// }
//
// function closeSmallModal() {
//     let modal = document.getElementById('small-modal');
//     modal.innerHTML = "";
//     modal.classList.replace('visible', 'hidden');
//     window.removeEventListener('click', closeSmallModal)
// }
//
// function addHidingModal() {
//     let closeButton = document.getElementById('close-small-modal');
//     closeButton.addEventListener('click', closeSmallModal);
//     setTimeout(function () {
//         window.addEventListener('click', closeSmallModal)
//     }, 200)
// }
//
// // ---- other modals
// function closeModal(modalId) {
//     setTimeout(function () {
//         $(`#${modalId}`).modal('hide')
//     }, 2000);
// }
//
// function clearModal(modalId) {
//     $(`#${modalId}`).on('hide.bs.modal', function () {
//         let modal = document.getElementById(modalId);
//         let alerts = modal.querySelectorAll('.alert');
//         let inputs = modal.querySelectorAll('input');
//
//         for(let alert of alerts){
//             alert.style.display = 'none';
//             alert.textContent = '';
//         }
//         for(let input of inputs){
//             input.value = '';
//         }
//     });
// }
//
//
// ///////////////////Formatting ///////////////////////////////////
//
// export {formatPlanet, formatPlanetDataForResidents, formatResidentData}
//
// function formatDiameter(planet) {
//     return planet['diameter'] >= 0 ? planet['diameter'] + ' km' : 'unknown'
// }
//
// function formatSurfaceWater(planet) {
//     return planet['surface_water'] >= 0 ? planet['surface_water'] + ' %' : 'unknown'
// }
//
// function formatPopulation(planet) {
//     return planet['population'] > 0 ? Number(planet['population']).toLocaleString('ja-JP') + ' people' : 'unknown'
// }
//
// function formatResidents(planet) {
//     return planet['residents'].length > 0 ?
//         `<button class="residents-button btn btn-outline-info" type="button">${planet['residents'].length} ${'resident(s)'}</button>`
//         : `<button class="residents-button hidden"></button><span>No known residents</span>`
// }
//
// function formatHeight(resident) {
//     return (resident['height'] >= 0) ? (resident['height'] / 100).toFixed(2) + ' m' : 'unknown'
// }
//
// function formatMass(resident) {
//     return (resident['mass'] >= 0) ? resident['mass'] + ' kg' : 'unknown'
// }
//
// function formatGenderIcon(gender) {
//     let icon = '';
//     switch (gender) {
//         case 'male':
//             icon = 'mars';
//             break;
//         case 'female':
//             icon = 'venus';
//             break;
//         default:
//             icon = 'genderless';
//     }
//     return `<i class="fas fa-${icon}"></i>`;
//
// }
//
// function formatPlanet(planets) {
//     return {
//         next: planets.next,
//         previous: planets.previous,
//         planet: planets["results"].map(planet => {
//             let name = planet['name'],
//                 diameter = formatDiameter(planet),
//                 climate = planet['climate'],
//                 terrain = planet['terrain'],
//                 surfaceWater = formatSurfaceWater(planet),
//                 population = formatPopulation(planet),
//                 residents = formatResidents(planet),
//                 url = planet['url'];
//             return [name, diameter, climate, terrain, surfaceWater, population, residents, url]
//
//         })
//     }
// }
//
// function formatPlanetDataForResidents(planet) {
//     return {
//         name: planet['name'],
//         residents: planet['residents'].sort()
//     }
// }
//
// function formatResidentData(resident) {
//     let name = resident['name'],
//         height = formatHeight(resident),
//         mass = formatMass(resident),
//         hair_color = resident['hair_color'],
//         skin_color = resident['skin_color'],
//         eye_color = resident['eye_color'],
//         birth_year = resident['birth_year'],
//         gender = formatGenderIcon(resident['gender']);
//     return [name, height, mass, hair_color, skin_color, eye_color, birth_year, gender];
// }*/

