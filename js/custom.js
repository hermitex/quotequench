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
const closeShare = document.querySelector("#close-share");
const numOfQuote = document.querySelector("#quote-search");
const getQuoteBtn = document.querySelector("#get-quote");
const content = document.querySelector(".wrapper");
const searchBar = document.querySelector(".search");
let shareBtn = "";
let shareButtons = "";

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
    let output = "";

    const isAuthorNameValid = (authorName) => {
      if (authorName) {
        return authorName;
      } else {
        return "";
      }
    };

    getQuoteBtn.addEventListener("click", (e) => {
      e.preventDefault();

      //QUOTE INDEX
      const quoteIndex = () => Math.floor(Math.random() * newQuoteArray.length);

      for (let i = 0; i < parseInt(numOfQuote.value); i++) {
        var card = document.createElement("div");
        var shareControlBtn = document.createElement("button");
        shareControlBtn.classList.add("share-btn");
        var shareControlBtns = document.createElement("div");
        var shareControlBtn1 = document.createElement("button");
        var shareControlBtn2 = document.createElement("button");
        var shareControlBtn3 = document.createElement("button");
        var shareControlLink1 = document.createElement("a");
        var shareControlLink2 = document.createElement("a");
        var shareControlLink3 = document.createElement("a");
        var shareControlIcon1 = document.createElement("i");
        var shareControlIcon2 = document.createElement("i");
        var shareControlIcon3 = document.createElement("i");
        shareControlLink1.setAttribute("href", "http://twitter.com");
        shareControlLink2.setAttribute("href", "http://facebook.com");
        shareControlLink3.setAttribute("href", "http://instagram.com");
        shareControlIcon1.classList.add("fab");
        shareControlIcon2.classList.add("fa-facebook-square");
        shareControlIcon3.classList.add("fab");
        shareControlIcon1.classList.add("fa-twitter-square");
        shareControlIcon2.classList.add("fab");
        shareControlIcon3.classList.add("fa-instagram-square");
        shareControlBtns.classList.add("share-button");
        shareControlBtns.classList.add("none");
        shareControlLink1.appendChild(shareControlIcon1);
        shareControlLink2.appendChild(shareControlIcon2);
        shareControlLink3.appendChild(shareControlIcon3);
        shareControlBtn1.appendChild(shareControlLink1);
        shareControlBtn2.appendChild(shareControlLink2);
        shareControlBtn3.appendChild(shareControlLink3);
        shareControlBtns.appendChild(shareControlBtn1);
        shareControlBtns.appendChild(shareControlBtn2);
        shareControlBtns.appendChild(shareControlBtn3);

        let randomQuote = newQuoteArray[quoteIndex()];
        output += `<div class="card">
        <div class="random-quote">
            <div class="avatar">         
              <img class='avatar-image' src=${randomQuote.img}>
            </div>

            <p>            
            ${randomQuote.quote}
            </p>
            <hr><br>
            <div class="share">
                <button id="author"> <span id="by">By</span> <span id="first-name">${isAuthorNameValid(
                  randomQuote.authorFirstName
                )}</span> <span
                        id="second-name">${isAuthorNameValid(
                          randomQuote.authorSecondName
                        )}</span>
                </button>
              <!-- <button class="share-btn"></button> -->

            </div>          
            <div class="share-button none">
                <button> <a href="http://"></a><i class="fab fa-facebook-square"></i> </button>
                <button><a href="http://"></a><i class="fab fa-twitter-square"></i></button>
                <button><a href="http://"></a><i class="fab fa-instagram-square"></i></button>
            </div>
        </div>
    </div>`;
      }
      card.innerHTML = output;
      searchBar.parentElement.insertBefore(card, searchBar.nextElementSibling);

      const authorDiv = document.querySelector("#author");
      output = "";

      const showShareButtons = (shareBtn, shareButtons) => {
        if (shareButtons.classList.contains("flex")) {
          shareButtons.classList.add("flex");
          shareButtons.classList.remove("none");
          shareBtn.innerHTML = "X";
          console.log(shareBtn, shareButtons);
          shareBtn.style.backgroundColor = "red";
          shareBtn.style.width = "3rem";
          shareBtn.style.fontWeight = "bold";
          authorDiv.parentElement.insertBefore(
            shareControlBtn,
            authorDiv.nextElementSibling
          );
        } else if (shareButtons.classList.contains("none")) {
          shareButtons.classList.add("none");
          shareButtons.classList.remove("flex");
          shareBtn.innerHTML = "Share";
          shareBtn.style.backgroundColor = "green";
          shareBtn.style.width = "auto";
          shareBtn.style.fontWeight = "normal";
          authorDiv.parentElement.insertBefore(
            shareControlBtn,
            authorDiv.nextElementSibling
          );
          console.log(authorDiv.parentElement);
        }
      };
      showShareButtons(shareControlBtn, shareControlBtns);
    });
  } catch (error) {
    return console.log(error);
  }
};
fetchQuotes();

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
  } else {
    greeting.innerHTML = "Evening!";
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
  setTimeout(() => showTime(), 1000);
};

// FORMAT TIME FUNCTION
const isLessThanTen = (num) => `${parseInt(num) < 10 ? "0" + num : num}`;
time.onload = showTime();

time.onload = showTime();
// getQuoteBtn.onclick = showShareButtons;
