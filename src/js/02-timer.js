import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onClickStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

let timerId = null;

function onClickStartBtn() {
  if (timerId) {
    clearInterval(timerId);
  }
  refs.startBtn.disabled = true;
  const currentTime = Date.now();
  const chosenTime = new Date(refs.input.value).getTime();
  let remainingTime = chosenTime - currentTime;

  timerId = setInterval(() => {
    remainingTime -= 1000;

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      remainingTime = 0;
    }

    const timeLeft = convertMs(remainingTime);
    refs.days.textContent = addLeadingZero(timeLeft.days);
    refs.hours.textContent = addLeadingZero(timeLeft.hours);
    refs.minutes.textContent = addLeadingZero(timeLeft.minutes);
    refs.seconds.textContent = addLeadingZero(timeLeft.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}