import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startButon = document.querySelector('[data-start]');;
const daysTime = document.querySelector('[data-days]');
const hoursTime = document.querySelector('[data-hours]');
const minutesTime = document.querySelector('[data-minutes]');
const secondsTime = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');

//startButon.setAttribute('disabled', 'true');

startButon.addEventListener('click', () => {
  startButon.disabled = true;
  input.disabled = true;
  startTimer();
});

let timeDifference;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
    minuteIncrement: 1,
  onClose(selectedDates) {
    const userDate = new Date(selectedDates[0]).getTime();
    const startDate = Date.now();


    if (userDate >= startDate) {
      startButon.disabled = false;
      timeDifference = userDate - startDate;
      updateClockface(convertMs(timeDifference));

    } else {
    
      iziToast.error({
        fontSize: 'large',
        close: false,
        position: 'topRight',
        messageColor: 'white',
        timeout: 2000,
        backgroundColor: 'red',
        message: ("Please choose a date in the future")
      });
    }
  }
};
flatpickr('input', options);
 
function updateClockface({ days, hours, minutes, seconds }) {
  daysTime.textContent = `${days}`;
  hoursTime.textContent = `${hours}`;
  minutesTime.textContent = `${minutes}`;
  secondsTime.textContent = `${seconds}`;
}

function startTimer() {
  clearInterval(intervalId);
  intervalId = setInterval(timer, 1000);
 
}

function timer() {
  if (timeDifference > 0) {
    timeDifference -= 1000;
    updateClockface(convertMs(timeDifference));
  } else {

    clearInterval(intervalId);
    input.disabled = false;
   
  }
}


function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(time) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(time / day));
  const hours = addLeadingZero(Math.floor((time % day) / hour));
  const minutes = addLeadingZero(Math.floor(((time % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((time % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

