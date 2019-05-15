export {postData}

function postData(link, data, callback) {
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