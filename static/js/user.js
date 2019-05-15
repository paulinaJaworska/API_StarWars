import {postData} from "./requests.js";
import {displayNavbar} from "./navbar.js";

export {registration}

let user = {
    loginFail: document.getElementById('errorAlert'),
    loginSuccess: document.getElementById('successAlert'),

    registerFail: document.getElementById('registrationError'),
    registerSuccess: document.getElementById('registrationSuccess'),

    loginForm: document.getElementById('login-form'),
    registrationForm: document.getElementById('register-form'),
};


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
        postData('/registration', registrationData, registrationResponseHandler.bind(null, registrationData.username))
    } else {
        displayErrorMessage(user.registerFail, user.registerSuccess, "Fill out the empty fields")
    }
}

function registrationResponseHandler(username, response) {
    if (response['state'] === 'success') {
        localStorage.setItem('username', username);
        displaySuccessMessage(user.registerFail, user.registerSuccess, `Welcome ${username}`);
        //
        displayNavbar(username);
        //setNavBarForLogged(username);
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



// display messages about success/loginFail (login/registration)
function displayErrorMessage(fail, success, message) {

   fail.style.display = 'block';
   fail.textContent = message;

   success.style.display = 'none';

}

function displaySuccessMessage(fail, success, message) {

   success.style.display = 'block';
   success.textContent = message;

   fail.style.display = 'none';
}


/*}

function clearModal(modalId) {
    let modal
}*/


/*
function closeModal(modalId) {
     setTimeout(function () {
         $(`#${modalId}`).modal('hide')
     }, 2000);
 }

function clearModal(modalId) {
    $(`#${modalId}`).on('hide.bs.modal', function () {
        let modal = document.getElementById(modalId);
        let alerts = modal.querySelectorAll('.alert');
        let inputs = modal.querySelectorAll('input');

        for(let alert of alerts){
            alert.style.display = 'none';
            alert.textContent = '';
        }
        for(let input of inputs){
            input.value = '';
        }
    });
}*/
