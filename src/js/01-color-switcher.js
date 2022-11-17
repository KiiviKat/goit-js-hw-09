const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timerId = setInterval(() => {
    const getColor = getRandomHexColor();
    bodyEl.style.backgroundColor = getColor;
    startBtnEl.setAttribute('disabled', 'disabled');
    stopBtnEl.removeAttribute('disabled');
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(timerId);
  startBtnEl.removeAttribute('disabled');
  stopBtnEl.setAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
