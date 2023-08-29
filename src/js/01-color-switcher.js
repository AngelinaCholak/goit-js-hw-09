const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let changeСolorInterval = null;

buttonStart.addEventListener('click', startColorChange);
buttonStop.addEventListener('click', stopColorChange);


function startColorChange() {
    buttonStart.disabled = true;
    buttonStop.disabled = false;
    changeСolorInterval = setInterval(changeBackgroundColor, 1000);
};

function stopColorChange() {
    buttonStart.disabled = false;
    buttonStop.disabled = true;
    clearInterval(changeСolorInterval);

};
 function changeBackgroundColor() {
      const randomColor = getRandomHexColor();
      document.body.style.backgroundColor = randomColor;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
