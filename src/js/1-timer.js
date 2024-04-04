import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');

const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');


flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validateSelectedDate(selectedDates[0]);
  },
});

btnStart.disabled = true;


function validateSelectedDate(selectedDate) {
  if (selectedDate <= Date.now()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      backgroundColor: '#EF4040',
      titleColor: '#fff',
      titleSize: '16px',
      titleLineHeight: '1.5',
      messageColor: '#fff',
      messageSize: '16px',
      messageLineHeight: '1.5',
      position: 'topRight',
      timeout: 2000,
      progressBar: false,
    });

    btnStart.disabled = true;
  
  } else {
    btnStart.disabled = false;
  }
}



btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  btnStart.disabled = true;


  input.disabled = true;


  const clockValue = input.value;

  const timerInt = setInterval(() => {
    const initDate = new Date(clockValue);
    const diffTime = initDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(diffTime);

    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    min.textContent = addLeadingZero(minutes);
    sec.textContent = addLeadingZero(seconds);

    if (diffTime < 1000) {
      clearInterval(timerInt);

      input.disabled = false;

    }
  }, 1000);
}

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
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}

