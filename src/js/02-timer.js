import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

import "flatpickr/dist/flatpickr.min.css";


const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
const startRef = document.querySelector('[data-start]');
let intervalID = null;

startRef.setAttribute('disabled', 'disabled');

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            Notiflix.Notify.warning('Please choose a date in the future');
            return;
        }
        startRef.removeAttribute('disabled');

        startRef.addEventListener('click', onStartRefClick);

        function timer() {
            const time = selectedDates[0] - Date.now();
            const { days, hours, minutes, seconds } = convertMs(time);
            daysRef.textContent = addLeadingZero(days);
            hoursRef.textContent = addLeadingZero(hours);
            minutesRef.textContent = addLeadingZero(minutes);
            secondsRef.textContent = addLeadingZero(seconds);
            
            if (time <= 1000) {
                clearInterval(intervalID);
                startRef.setAttribute('disabled', 'disabled');
                Notiflix.Notify.success('Timer is completed');
            }
        }
        
        timer();
        
        function onStartRefClick() {
            intervalID = setInterval(timer, 1000);
        };
        
    },
};

flatpickr("#datetime-picker", options);
