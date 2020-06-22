import { quotes } from './quotesDB.js';
const time = document.querySelector('.time');
const time1 = document.querySelector('.time1');
const greeting = document.querySelector('.greet #yellow');
const welcomeTag = document.querySelector('.welcome-tag #yellow-1');
const quoteContent = document.querySelector('.random-quote p');
const firstName = document.querySelector('#first-name');
const secondName = document.querySelector('#second-name');
const prev = document.querySelector('.previous');
const next = document.querySelector('.next');
const totalQuotes = document.querySelector('.total-quotes');
const randIndex = document.querySelector('#rand-index');
const landing = document.querySelector('.read-quotes');
const container = document.querySelector('.container');
const overlay = document.querySelector('.overlay');
const currentDate = document.querySelector('.date');
const close = document.querySelector('#close');
const urge = document.querySelector('#urge');
console.log(close)
// HOME ACTIVATION
landing.addEventListener('click', () => {
    if (!overlay.classList.contains('disappear')) {
        overlay.classList.add('disappear');
        container.style.display = 'block';
        container.style.height = '100%';
    }
});

close.addEventListener('click', () => {
    overlay.classList.remove('disappear');
    container.style.display = 'none';
    container.style.height = '0';
    urge.textContent = 'Hey 😊 you can always come back for more 😉';
});

// GREETING FUNCTION
const greet = time => {
    parseInt(time);
    if (time >= 0 && time <= 12) {
        greeting.innerHTML = 'Morning!';
        greeting.innerHTML = 'Morning!';
    } else if (time >= 12 && time <= 16) {
        greeting.innerHTML = 'Afternoon!';
        welcomeTag.innerHTML = 'Afternoon!';
    } else {
        greeting.innerHTML = 'Evening!';
        welcomeTag.innerHTML = 'Evening!';
    }
};

// TIME FUNCTION
const showTime = () => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const day = weekDays[today.getUTCDay()];
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const date = today.getDate();
    greet(hour);
    time.innerHTML = `<h1>${isLessThanTen(hour)} : ${isLessThanTen(minutes)} : <span style="color: green;">${isLessThanTen(seconds)}</span></h1>`;
    time1.innerHTML = `<h1>${isLessThanTen(hour)} : ${isLessThanTen(minutes)} : <span style="color: green;">${isLessThanTen(seconds)}</span></h1>`;
    currentDate.innerHTML = `${date}<span class="superscript">nd</span> ${day}`;
    setTimeout(() => showTime(), 1000)
};

// FORMAT TIME FUNCTION
const isLessThanTen = num => `${parseInt(num) < 10 ? '0' + num : num}`;
time.onload = showTime();

// TOTAL QUOTES
totalQuotes.innerHTML = `Total Quotes: ${quotes.length}`;


//QUOTE INDEX 
const quoteIndex = () => Math.floor(Math.random() * quotes.length);

//QUOTE FILTER
const findQuote = (event) => {
    const index = quoteIndex();
    if (event.target.classList.contains('next')) {
        findNextQuote(index)
    }
    else if (event.target.classList.contains('previous')) {
        findPrevQuote(index - 1)
    }
};

//NEXT QUOTE
const findNextQuote = (index = 0) => {
    quoteContent.innerHTML = quotes[index].quote;
    firstName.innerHTML = quotes[index].authorFirstName;
    secondName.innerHTML = quotes[index].authorSecondName;
    randIndex.textContent = `#${quotes[index].id}`;
    console.log(randIndex)
};



//PREV QUOTE
const findPrevQuote = (index) => {
    quoteContent.innerHTML = quotes[index].quote;
    firstName.innerHTML = quotes[index].authorFirstName;
    secondName.innerHTML = quotes[index].authorSecondName;
    randIndex.textContent = `#${quotes[index].id}`;
}

next.onclick = findQuote;
prev.onclick = findQuote;



