const time = document.querySelector('.time');

const showTime = () => {
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    time.innerHTML = `<h1>${hour} : ${minutes} : <span style="color: green;">${seconds}</span></h1>`;
    setTimeout(() => showTime(), 1000)
};



time.onload = showTime();