export {showRegisterModal, openTestModal}

function showRegisterModal() {
    //let modal = document.getElementsByClassName("modal");
    let modal = document.getElementById('registerModal');
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


let modal = document.getElementById("modal");
let modalContent = document.getElementById("modalContent");
let modalBody = document.getElementById("modalBody");
let closeBtn = document.getElementById("modalClose");
/// listen on close button
closeBtn.addEventListener('click', closeModal);
// listen for outside click
window.addEventListener('click', clickOutside);

function openTestModal() {
    modal.style.display = 'block';
}
function closeModal() {
    modal.style.display = "none";
}
function clickOutside(e) {
    if (e.target === modal) {
        modal.style.display = "none";
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