// Подключить библиотеки 
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    btnStart: document.querySelector('[data-start]'),
    dataInput: document.querySelector('input#datatime-picker'),
    timer: document.querySelector('.timer'),
    dateDays: document.querySelector('[data-days]'),
    dateHours: document.querySelector('[data-hours]'),
    dateMinutes: document.querySelector('[data-minutes]'),
    dateSeconds: document.querySelector('[data-seconds]'),
};
// вызываем глоюальные переменные 
let deltaTime = null;
let currentTime = null;
let intervalId = null;
let isActive = false; 

// Библиотека ожидает что её инициализируют на элементе input[type="text"], 
// поэтому мы добавили в HTML документ поле input#datetime - picker.
// объект параметров, который является аргументом функции flatpickr(selector("input#datetime-picker"), options)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        // выбранная дата в календаре 
        currentTime = selectedDates[0]; 
        // отнимаем от выбранной даты текущую дату 
        deltaTime = currentTime - options.defaultDate;
        // если выбранная дата меньше текущей, тогда ошибка. кнопка не активна 
        if (currentTime < options.defaultDate) {
          refs.btnStart.disabled = true;
          Notiflix.Notify.warning("Please choose a date in the future");
        } else {
            refs.btnStart.disabled = false;
        }
  },
};
flatpickr("input#datetime-picker", options);
// запуск таймера 
refs.btnStart.addEventListener('click', onClickStart);

function onClickStart() {
    // если при запуске таймера он уже активный , то тогда мы выходим из функции, если неактивный, 
    // тогда делаем его активным, чтобы избежать повторных запусков интервалов бесконечно 
      if (isActive) {
            return;
        }
    isActive = true;
    // создаем интервал в котором создем переменную time (она состоит из функции convertMs 
    // которой предоставляется параметр deltaTime) 
    intervalId = setInterval(() => {
        let time = convertMs(deltaTime);
        getTimeComponents(time);
                // при каждом запуске intervalId каждую 1 секунду от deltaTime будет отниматься 1сек (обратный счетчик)
             deltaTime -= 1000;
                // если deltaTime меньше или = 0 , тогда счетчик очищается 
            if (deltaTime <= 0) {
                clearInterval(intervalId);  
            }
    }, 1000)
   
}
//  В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов.
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
// Для подсчета значений используй готовую функцию convertMs, 
// где ms - разница между конечной и текущей датой в миллисекундах.
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
// преобразование в текст 
function getTimeComponents({seconds, minutes, hours, days}) {
    refs.dateSeconds.textContent = seconds;
    refs.dateMinutes.textContent = minutes;
    refs.dateHours.textContent = hours;
    refs.dateDays.textContent = days;
};

