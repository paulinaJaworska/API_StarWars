/*$.getJSON('https://api.github.com/repos/atom/atom', function(response){
    document.getElementById('ajax-content').innerHTML = response;
    console.log(response['stargazers_count'])
});*/


detailsButton = document.getElementById("btn-details");
detailsButton.addEventListener('click', showResidentsDetails);

function showResidentsDetails() {
    // 1. create a new XMLHttpRequest object -- an object like any other!
    let xhttp = new XMLHttpRequest();
    // 2. open the request and pass the HTTP method name and the resource as parameters
    // true is for async
    xttp.open("GET", "residents.json", true);
    // 3. write a function that runs anytime the state of the AJAX request changes
    xhttp.onreadystatechange = function () {
        // 4. check if the request has a readyState of 4, which indicates the server has responded (complete)
        if (this.readyState == 4 && this.status == 200) {
            // 5. insert the text sent by the server into the HTML of the 'ajax-content'
            document.getElementById("ajax-content").innerHTML = this.responseText;
         } else if (this.status = 404) {
            document.getElementById("ajax-content").innerHTML = "Not found";
        }
    xhttp.onerror = function() {
        conslie.log(this.responseText)
    }
    };
    xhttp.send();
}