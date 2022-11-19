import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minEl: document.querySelector('[data-minutes]'),
  secEl: document.querySelector('[data-seconds]'),
};

let timerId;

refs.startBtnEl.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      return refs.startBtnEl.removeAttribute('disabled');
    }

    Notiflix.Notify.failure('Please choose a date in the future');
  },
};

flatpickr(refs.inputEl, options);

const dataPickr = new flatpickr(refs.inputEl, options);

refs.startBtnEl.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.startBtnEl.setAttribute('disabled', 'disabled');
  const startTime = dataPickr.selectedDates[0];

  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;

    if (deltaTime < 1000) {
      clearInterval(timerId);
    }

    const time = convertMs(deltaTime);

    refs.daysEl.textContent = time.days;
    refs.hoursEl.textContent = time.hours;
    refs.minEl.textContent = time.minutes;
    refs.secEl.textContent = time.seconds;
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
