/*
function showVerificationResult () {
fetch('/registration')
    .then(function(response) {
        let state = response['state'];
        if ( state === 'empty') {
            // flash please fill the fields
        } else if (state === 'in_db') {
            // user already exists
        } else if (state === 'not_equal') {
            // Incorrect password
        } else if (state === 'success') {
            // user logged in (display in navbar)
        }
    })
}

fetch('/registration')
    .then(function (response) {
        return response.text()
    });
.then (function(text))

// JSON wat
let person = {'name':'Andrew', 'loves': 'opensorce'}; // object
let asJSON = JSON.stringify(person); // string,   in Python json.dumps()

// reversed str - > object
let asObject = JSON.parse(asJSON); // object again in python json.loads()

//////////////////////////////////////////////////////////////////////////
//AJAX WAY
// GET is default method so we dont have to set it
fetch('/hello')
    .then(function(response) {
    return response.text()
}) .then (function(text) {
    console.log('GET respose text:');
    console.log(text);
}) .catch (err => {
    console.error('fetch failed', err)
});
// Send dome request
fetch('/hello')
    .then (function (response) {
        return response.json(); // Parse it as JSON
    })
    .then (function(json) {
        console.log('GET response as JSON');
        console.log(json);   //JSON object
    });

// SEND JSON TO PYTHON WITH POST
fetch('/hello', {
    method: 'POST',
    body : JSON.stringify ( { // A JSON PAYload
        'greeting': "Hello from browser"
    }) .then (function (response) { // Flask has just printed our JSON
        return response.text()
    }) .then (function(text) {
        console.log('Post response');
        console.log(text);
    })
})

fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then(function() {
        // Your code for handling the data you get from the API
    })
    .catch(function() {
        // This is where you run code if the server returns any errors
    });

*/

import {displaySuccessMessage, displayErrorMessage, openModal, closeModal, clearModal} from "./dom_handler.js";
import {//addCellsWithVoteButtons, removeCellsWithVoteButtons,
        enableVoting, disableVoting} from "./vote.js";
import {setNavBarForLogged, setNavBarForNotLogged} from "./navbar.js";
import {postDataModern, getDataModern} from "./api_ajax.js";

export {logOut, logIn, registration}



//---------------------------------------------------------------------------------------------------------
let user = {
loginFail: document.getElementById('errorAlert'),
loginSuccess: document.getElementById('successAlert'),

registerFail: document.getElementById('registrationError'),
registerSuccess: document.getElementById('registrationSuccess'),

loginForm: document.getElementById('login-form'),
registrationForm: document.getElementById('register-form'),
};

// ------log out----------

function logOut(event) {
    event.preventDefault();
    getDataModern('POST', '/logout', logOutResponseHandler)
}

function logOutResponseHandler(response) {
    let username = localStorage.getItem('username');
    if (response['state'] === 'success') {
        openModal(username, `See you later ${username} :)`);
        localStorage.clear();
        setNavBarForNotLogged();
        //
        disableVoting();
        //removeCellsWithVoteButtons();
    } else {
        openModal(username, `You did not logout ${username}. Try again`);
    }
}

// ------ log in ---------

function logIn(event) {
    event.preventDefault();
    prepareLoginForm()
}

function prepareLoginForm() {
    let form = user.loginForm;
    clearModal('loginModal');
    form.addEventListener('submit', verifyUserLogIn)
}

function verifyUserLogIn(event) {
    event.preventDefault();
    let loginData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    if (loginData.username && loginData.password) {
        postDataModern('/login', loginData, logInResponseHandler.bind(null, loginData.username))
    } else {
        displayErrorMessage(user.loginFail, user.loginSuccess, "Fill out the empty fields")
    }
}

function logInResponseHandler(username, response) {
    if (response['state'] === 'success') {
        localStorage.setItem('username', username);
        displaySuccessMessage(user.loginFail, user.loginSuccess, `Welcome ${username}`);
        setNavBarForLogged(username);
        //
        enableVoting();
        //addCellsWithVoteButtons();
        closeModal('loginModal')

    } else {
        displayErrorMessage(user.loginFail, user.loginSuccess, 'Wrong username or password!')
    }
}

// ----------- registration -----------

function registration(event) {
    event.preventDefault();
    prepareRegisterForm()
}

function prepareRegisterForm() {
    let form = user.registrationForm;
    clearModal('registerModal');
    form.addEventListener('submit', verifyUserRegistration)
}

function verifyUserRegistration(event) {
    event.preventDefault();
    let registrationData = {
        username: document.getElementById('new_username').value,
        password: document.getElementById('new_password').value,
        confirmPassword: document.getElementById('password_verify').value,
    };

    if (registrationData.username && registrationData.password && registrationData.confirmPassword) {
        postDataModern('/registration', registrationData, registrationResponseHandler.bind(null, registrationData.username))
    } else {
        displayErrorMessage(user.registerFail, user.registerSuccess, "Fill out the empty fields")
    }
}

function registrationResponseHandler(username, response) {
    if (response['state'] === 'success') {
        localStorage.setItem('username', username);
        displaySuccessMessage(user.registerFail, user.registerSuccess, `Welcome ${username}`);
        setNavBarForLogged(username);
        //
        enableVoting();
        //addCellsWithVoteButtons();
        closeModal('registerModal')

    } else if(response['state'] === 'empty'){
        displayErrorMessage(user.registerFail, user.registerSuccess, 'Fill out the empty fields')
    }else if(response['state'] === 'in_base'){
        displayErrorMessage(user.registerFail, user.registerSuccess, 'This username already exists')
    }else if(response['state'] === 'not_equal'){
        displayErrorMessage(user.registerFail, user.registerSuccess, 'Passwords must be equals')
    }
}