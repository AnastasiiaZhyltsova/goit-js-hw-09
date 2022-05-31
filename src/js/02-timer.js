// Подключить библиотеки 
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    btnStart: document.querySelector('[data-start]'),
    dataInput: document.querySelector('input#datatime-picker'),
    timer: document.querySelector('.timer'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
}

let deltaTime = null;
// Библиотека ожидает что её инициализируют на элементе input[type="text"], 
// поэтому мы добавили в HTML документ поле input#datetime - picker.
// объект параметров, который является аргументом функции flatpickr(selector, options)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
         deltaTime = selectedDates[0] - new Date;
        console.log(selectedDates[0]);
        if (selectedDates[0] < new Date) {
          Notiflix.Notify.warning("Please choose a date in the future");
      }
  },
};
flatpickr("input#datetime-picker", options);


class Timer {
    constructor() {
        this.intervalId = null;
        this.isActive = false;  
    }
     start() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        // const startTime = new Date();
        this.intervalId = setInterval(() => {
            // const currentTime = Date.now();
            // deltaTime = currentTime - startTime;
            const time = convertMs(deltaTime);
            getTimeComponents(time);

            const delTime = deltaTime - 1000;

            if (delTime <= 0) {
                clearInterval(this.intervalId);
            }
        }, 1000)
    }
}  
const timer = new Timer();

refs.btnStart.addEventListener('click', onClickStart);
function onClickStart() {
    timer.start();
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours =addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function getTimeComponents({seconds, minutes, hours, days}) {
    refs.dataSeconds.textContent = seconds;
    refs.dataMinutes.textContent = minutes;
    refs.dataHours.textContent = hours;
    refs.dataDays.textContent = days;
};

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}