/*function clearElement(id) {
    const element = document.getElementById(id);
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}*/


// navbar elements

function createLogoutBtn() {
    let logoutBtn = document.createElement('li');
    logoutBtn.classList.add('btn btn-light', 'logout');
    logoutBtn.setAttribute('id', 'logout-btn');

    let a = document.createElement('a');
    a.classList.add('nav-item nav-link active');
    a.setAttribute('href', "/logout");
    a.textContent = 'Logout';
    logoutBtn.appendChild(a);

    //logoutBtn.addEventListener('click', logOut);

    return logoutBtn
}

function createLoginBtn() {
    let loginNav = document.createElement('li');
    loginNav.classList.add('btn btn-light', 'login');
    loginNav.setAttribute('id', 'login-btn');

    let a = document.createElement('a');
    a.classList.add('nav-item nav-link active');
    a.setAttribute('data-toggle', 'modal');
    a.setAttribute('data-target', '#loginModal');
    a.textContent = 'Login';

    loginNav.appendChild(a);
    //loginNav.addEventListener('click', logIn);

    return loginNav
}

function createRegistrationBtn() {
    let registrationBtn = document.createElement('li');
    registrationBtn.classList.add('btn btn-light', 'registeration');
    registrationBtn.setAttribute('id', 'registration-btn');

    let a = document.createElement('a');
    a.classList.add('nav-item nav-link active');
    a.setAttribute('data-toggle', 'modal');
    a.setAttribute('data-target', '#registerModal');
    a.textContent = 'Registration';

    registrationBtn.appendChild(a);

    //registrationBtn.addEventListener('click', registration);

    return registrationBtn

}

function createLoginInfo(username) {
    let loginInfo = document.createElement('li');
    loginInfo.classList.add('nav-item');
    loginInfo.setAttribute('id', 'user-info');

    let span = document.createElement('span');
    span.classList.add('navbar-text');
    span.textContent = 'Logged as ' + username;

    loginInfo.appendChild(span);

    return loginInfo
}


// handle navbar

function setToNotLogged() {
    let container = document.getElementById('navbar-temp');
    let registrationBtn = createRegistrationBtn();
    let loginBtn = createLoginBtn();
    let logoutBtn = document.getElementById('logout-btn');
    let userInfo = document.getElementById('user-info');

    if (container.contains(logoutBtn) && container.contlogoutBtnains(userInfo)) {
        container.replaceChild(registrationBtn, logoutBtn);
        container.replaceChild(loginBtn, userInfo);
    } else {
        container.appendChild(registrationBtn);
        container.appendChild(loginBtn);
    }
}

function setToLoggedIn(username) {
    let container = document.getElementById('navbar-temp');
    let registrationBtn = createRegistrationBtn();
    let loginBtn = createLoginBtn();
    let logoutBtn = document.getElementById('logout-btn');
    let userInfo = document.getElementById('user-info');

    if (container.contains(registrationBtn) && container.contains(loginBtn)) {
        container.replaceChild(logoutBtn, registrationBtn);
        container.replaceChild(userInfo, loginBtn);
    } else {
        container.appendChild(logoutBtn);
        container.appendChild(userInfo);
    }
}

function displayNavbar() {
    let username = localStorage.getItem('username');
    if (username) {
        setToLoggedIn(username)
    } else {
        setToNotLogged()
    }
}