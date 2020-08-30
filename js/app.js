import { quotes } from "./quotesDB.js";
const time = document.querySelector(".time");
const time1 = document.querySelector(".time1");
const greeting = document.querySelector(".greet #yellow");
const welcomeTag = document.querySelector(".welcome-tag #yellow-1");
const quoteContent = document.querySelector(".random-quote p");
const firstName = document.querySelector("#first-name");
const secondName = document.querySelector("#second-name");
const avatar = document.querySelector(".avatar");
const prev = document.querySelector(".previous");
const next = document.querySelector(".next");
const totalQuotes = document.querySelector(".total-quotes");
const randIndex = document.querySelector("#rand-index");
const landing = document.querySelector(".read-quotes");
const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const currentDate = document.querySelector(".date");
const close = document.querySelector("#close");
const urge = document.querySelector("#urge");
const shareBtn = document.querySelector("#share");
const shareButtons = document.querySelector(".share-button");
const closeShare = document.querySelector("#close-share");

// FETCH QUOTES
const url = "https://type.fit/api/quotes";
export const fetchQuotes = async () => {
  try {
    const response = await fetch(url);
    const fetchQuotes = await response.json();
    // CLEANING & NORMALIZING FECH DATA
    fetchQuotes.forEach((eachQuote, i) => {
      eachQuote.id = i + 101;
      eachQuote.quote = eachQuote.text;
      eachQuote.img = "./images/personalities/wise-jimp.jpg";
      delete eachQuote.text;
      if (eachQuote.author !== null) {
        let authorName = eachQuote.author.split(" ");
        if (authorName.length >= 2) {
          eachQuote.authorFirstName = authorName[0];
          eachQuote.authorSecondName = authorName[1];
        } else if (authorName.length == 1) {
          eachQuote.authorFirstName = authorName[0];
        }
      } else if (eachQuote.author == null) {
        eachQuote.authorFirstName = "Unknown";
        eachQuote.authorSecondName = "";
      }
      delete eachQuote.author;
    });

    // MERGE QUOTES
    let newQuoteArray = quotes.concat(fetchQuotes);

    // TOTAL QUOTES
    totalQuotes.innerHTML = `Total Quotes: ${newQuoteArray.length}`;

    //QUOTE INDEX
    const quoteIndex = () => Math.floor(Math.random() * newQuoteArray.length);

    //QUOTE FILTER
    const findQuote = (event_1) => {
      const index = quoteIndex();
      quoteID.push(index);

      if (event_1.target.classList.contains("next")) {
        findNextQuote(index);
      } else if (event_1.target.classList.contains("previous")) {
        findPrevQuote(index);
      }
    };

    //NEXT QUOTE
    const findNextQuote = (index_3) => {
      avatarImg.src = newQuoteArray[index_3].img;
      avatarImg.alt = newQuoteArray[index_3].authorFirstName;
      quoteContent.innerHTML = `${newQuoteArray[index_3].quote}`;
      firstName.innerHTML = newQuoteArray[index_3].authorFirstName;
      if (newQuoteArray[index_3].authorSecondName) {
        secondName.innerHTML = newQuoteArray[index_3].authorSecondName;
      } else {
        secondName.innerHTML = "";
      }
      randIndex.textContent = `#${index_3}`;
    };

    // INITIATE QUOTE SEARCH FUCNTION
    next.onclick = findQuote;
    prev.onclick = findQuote;

    //PREV QUOTE
    const findPrevQuote = (index_4) => {
      quoteContent.innerHTML = `${newQuoteArray[index_4].quote}`;
      firstName.innerHTML = newQuoteArray[index_4].authorFirstName;
      if (newQuoteArray[index_4].authorSecondName) {
        secondName.innerHTML = newQuoteArray[index_4].authorSecondName;
      }
      randIndex.textContent = `#${newQuoteArray[index_4].id}`;
    };
  } catch (error) {
    return console.log(error);
  }
};
fetchQuotes();

// share
const showShareButtons = () => {
  if (shareButtons.classList.contains("flex")) {
    shareButtons.classList.add("none");
    shareButtons.classList.remove("flex");
    shareBtn.innerHTML = "Share";
    shareBtn.style.backgroundColor = "green";
    shareBtn.style.width = "auto";
    shareBtn.style.fontWeight = "normal";
  } else if (shareButtons.classList.contains("none")) {
    shareButtons.classList.add("flex");
    shareButtons.classList.remove("none");
    shareBtn.innerHTML = "X";
    shareBtn.style.backgroundColor = "red";
    shareBtn.style.width = "3rem";
    shareBtn.style.fontWeight = "bold";
  }
};

// create avatar
let avatarImg = document.createElement("img");
avatarImg.classList.add("avatar-image");
avatar.append(avatarImg);

const quoteID = [];
// HOME ACTIVATION
landing.addEventListener("click", () => {
  if (!overlay.classList.contains("disappear")) {
    overlay.classList.add("disappear");
    container.style.display = "block";
    container.style.height = "100%";
  }
});

close.addEventListener("click", () => {
  overlay.classList.remove("disappear");
  container.style.display = "none";
  container.style.height = "0";
  urge.textContent = "Hey 😊 you can always come back for more 😉";
});

// GREETING FUNCTION
const greet = (time) => {
  parseInt(time);
  if (time >= 0 && time <= 11) {
    greeting.innerHTML = "Morning!";
    greeting.innerHTML = "Morning!";
  } else if (time >= 12 && time <= 16) {
    greeting.innerHTML = "Afternoon!";
    welcomeTag.innerHTML = "Afternoon!";
  } else {
    greeting.innerHTML = "Evening!";
    welcomeTag.innerHTML = "Evening!";
  }
};

// TIME FUNCTION
const showTime = () => {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const today = new Date();
  const year = today.getFullYear();
  const month = months[today.getMonth()];
  const day = weekDays[today.getUTCDay()];
  const hour = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const date = today.getDate();
  greet(hour);
  time.innerHTML = `<h1>${isLessThanTen(hour)} : ${isLessThanTen(
    minutes
  )} : <span style="color: green;">${isLessThanTen(seconds)}</span></h1>`;
  time1.innerHTML = `<h1>${isLessThanTen(hour)} : ${isLessThanTen(
    minutes
  )} : <span style="color: green;">${isLessThanTen(seconds)}</span></h1>`;
  currentDate.innerHTML = `${day}, ${date} ${month} ${year}`;

  setTimeout(() => showTime(), 1000);
};

// FORMAT TIME FUNCTION
const isLessThanTen = (num) => `${parseInt(num) < 10 ? "0" + num : num}`;
time.onload = showTime();

// SPEACH
// const getVoices = () => {
//   voices = synth.getVoices();
//   voices.forEach((voice) => {
//     let optionList = document.createElement("option");
//     optionList.textContent = `${voice.name} (${voice.lang})`;

//     if (voice.default) {
//       optionList.textContent += " -- DEFAULT";
//     }

//     optionList.setAttribute("data-lang", voice.lang);
//     optionList.setAttribute("data-name", voices.name);
//     selectVoice.appendChild(optionList);
//   });
// };
// if (speechSynthesis.onvoiceschanged !== undefined) {
//   speechSynthesis.onvoiceschanged = getVoices;
// }

// console.log(voices)

// pronuonce.onclick = function () {
//   var speach = new SpeechSynthesisUtterance(quoteContent.innerHTML);
//   console.log(quoteContent.innerHTML);
//   var selectedOption = selectVoice.selectedOptions[0].getAttribute("data-name");
//   for (let i = 0; i < voices.length; i++) {
//     if (voices[i].name === selectedOption) {
//       speach.voice = voices[i];
//     }
//   }
//   speach.pitch = 1;
//   speach.rate = 0.9;
//   synth.speak(speach);

//   speach.onstart = function (event) {
//     pronuonce.classList.add("blink_me");
//     pronuonce.classList.remove("no_blink");
//   };

//   speach.onend = function (event) {
//     pronuonce.classList.add("no_blink");
//     pronuonce.classList.remove("blink_me");
//   };
// };

// getVoices();

time.onload = showTime();
shareBtn.onclick = showShareButtons;
