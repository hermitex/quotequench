//  POST request using fetch() 
fetch('https://api.rsc.org/compounds/v1/filter/name', {

    // Adding method type 
    method: "POST",
    mode: "no-cors",
    credentials: "same-origin",

    // Adding headers to the request 
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'apikey': 'T2qVnbEG66o1oKQ7BqOwmOrBHNFm3wr3',
        'Content-type': 'application/json'
    },

    // Adding body or contents to send 
    body: JSON.stringify({
        'name': 'Benzene',
        'orderBy': '',
        'orderDirection': ''
    })


})

    // Converting to JSON 
    .then(response => response.json())

    // Displaying results to console 
    .then(json => console.log(json));
