// const weatherMan = (city) => {
//     let key = '{7b5a7eee3bce64ba7f1b64fb10ed2ba4}';
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
//         .then(response => response.json())
//         .then(data => console.log(data))
// };
// weatherMan('6167865')

// function weatherBalloon(cityID) {
//     var key = '{7b5a7eee3bce64ba7f1b64fb10ed2ba4}';
//     fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key)
//         .then(function (resp) { return resp.json() }) // Convert data to json
//         .then(function (data) {
//             console.log(data);
//         })
//         .catch(function () {
//             // catch any errors
//         });
// }

// window.onload = function () {
//     weatherBalloon(6167865);
// }

// const showQuotes = () => {
//     fetch('https://type.fit/api/quotes')
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.log(error))
// }
// showQuotes();