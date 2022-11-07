
const switchBodyColor = function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const startRef = document.querySelector('[data-start]');
const stopRef = document.querySelector('[data-stop]');

startRef.addEventListener('click', onStartRefClick);
stopRef.addEventListener('click', onStopRefClick);

function onStartRefClick() {
    startRef.setAttribute('disabled', 'disabled');
    intervalID = setInterval(() => {
        document.body.style.backgroundColor = switchBodyColor();
    }, 1000);
};

function onStopRefClick() {
    startRef.removeAttribute('disabled');
    clearInterval(intervalID);
};