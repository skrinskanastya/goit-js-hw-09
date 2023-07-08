const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startButton.addEventListener('click', startChangingColor);
stopButton.addEventListener('click', stopChangingColor);

let intervalId;
function startChangingColor() {
  startButton.disabled = true;
  intervalId = setInterval(changeBackgroundColor, 1000);
}

function stopChangingColor() {
  startButton.disabled = false;
  clearInterval(intervalId);
}

function changeBackgroundColor() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
}
