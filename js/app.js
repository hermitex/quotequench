const time = document.querySelector('.time');
const greeting = document.querySelector('.greet #yellow');

const greet = time => {
    parseInt(time);
    if (time >= 0 && time <= 12) {
        greeting.innerHTML = 'Morning!';
    } else if (time >= 12 && time <= 16) {
        greeting.innerHTML = 'Afternoon!';
    } else {
        greeting.innerHTML = 'Evening!';
    }
};

const showTime = () => {
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    greet(hour);
    time.innerHTML = `<h1>${isLessThanTen(hour)} : ${isLessThanTen(minutes)} : <span style="color: green;">${isLessThanTen(seconds)}</span></h1>`;
    setTimeout(() => showTime(), 1000)
};

const isLessThanTen = num => `${parseInt(num) < 10 ? '0' + num : num}`;

time.onload = showTime();
