import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.addEventListener('click', startTimer);
      startButton.disabled = false;
    }
  },
};

const flatpickrInstance = flatpickr('#datetime-picker', options);

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
  return String(value).padStart(2, '0');
}

function startTimer() {
  startButton.disabled = true;
  const timerFields = document.querySelectorAll('.timer .value');
  const endDate = flatpickrInstance.selectedDates[0].getTime();

  function updateTimer() {
    const currentDate = new Date().getTime();
    const remainingTime = endDate - currentDate;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerFields.forEach(field => (field.textContent = '00'));
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    timerFields[0].textContent = addLeadingZero(days);
    timerFields[1].textContent = addLeadingZero(hours);
    timerFields[2].textContent = addLeadingZero(minutes);
    timerFields[3].textContent = addLeadingZero(seconds);
  }

  const timerInterval = setInterval(updateTimer, 1000);
}

startButton.disabled = true;
