import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

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

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const dateTimePicker = document.querySelector('#datetime-picker');
  const dataStart = document.querySelector('[data-start]');
  const dataDays = document.querySelector('[data-days]');
  const dataHours = document.querySelector('[data-hours]');
  const dataMinutes = document.querySelector('[data-minutes]');
  const dataSeconds = document.querySelector('[data-seconds]');
  let countdownInterval;
  let startButtonDisabled = true; // Додаткова змінна для відстеження статусу кнопки "Start"

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates.length > 0) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();
        if (selectedDate > currentDate) {
          clearInterval(countdownInterval);
          const timeDifference = selectedDate - currentDate;
          startCountdown(timeDifference);
          startButtonDisabled = false; // Активувати кнопку "Start"
          dataStart.disabled = startButtonDisabled; // Оновити статус кнопки на сторінці
        } else {
          alert('Please choose a date in the future.');
        }
      }
    },
  };

  flatpickr(dateTimePicker, options);

  function startCountdown(timeDifference) {
    const updateCountdown = () => {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      dataDays.textContent = addLeadingZero(days);
      dataHours.textContent = addLeadingZero(hours);
      dataMinutes.textContent = addLeadingZero(minutes);
      dataSeconds.textContent = addLeadingZero(seconds);

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        alert('Countdown has ended!');
        startButtonDisabled = true; // Вимкнути кнопку "Start" після завершення
        dataStart.disabled = startButtonDisabled; // Оновити статус кнопки на сторінці
      } else {
        timeDifference -= 1000;
        setTimeout(updateCountdown, 1000);
      }
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  dataStart.addEventListener("click", function () {
    const selectedDate = flatpickr.parseDate(dateTimePicker.value, "Y-m-d H:i");
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      clearInterval(countdownInterval);
      const timeDifference = selectedDate - currentDate;
      startCountdown(timeDifference);
      startButtonDisabled = true; // Заблокувати кнопку "Start" після натискання
      dataStart.disabled = startButtonDisabled; // Оновити статус кнопки на сторінці
    } else {
      alert('Please choose a date in the future.');
    }
  });
});
